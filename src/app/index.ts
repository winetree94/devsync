import {
  abs,
  accessAsync,
  returnFalse,
  returnTrue,
  rmAsync,
  symlinkAsync,
} from "./utils";
import simpleGit from "simple-git";

export interface DevsyncConfigs {
  apps: DevSyncAppConfig[];
}

export interface DevSyncGitconfigs {
  owner: string;
  repo: string;
  rev?: string;
  path: string;
}

export interface DevSyncAppConfig {
  appName: string;
  git?: DevSyncGitconfigs[];
  files?: DevSyncFileConfig[];
}

export interface DevSyncFileConfig {
  permission?: number;
  source: string;
  target: string;
}

export const run = async (config: DevsyncConfigs) => {
  const filtered = await Promise.all(
    config.apps.map(async (app) => {
      const results = await Promise.all(
        app.files?.map(async (mapping) => {
          const sourceExist = await accessAsync(abs(mapping.source)).then(
            returnTrue,
          );

          const targetExist = await accessAsync(abs(mapping.target))
            .then(returnTrue)
            .catch(returnFalse);

          if (targetExist) {
            console.warn(mapping.source, "Target exist, removing target");
            await rmAsync(abs(mapping.target), { recursive: true });
          }

          return sourceExist;
        }) || [],
      );

      return {
        ...app,
        configs: app.files?.filter((_, index) => {
          return results[index];
        }),
      };
    }),
  );

  await Promise.all(
    filtered.map(async (app) => {
      await Promise.all(
        app.git?.map(async (gitConfig, index) => {
          const exist = await accessAsync(abs(gitConfig.path))
            .then(returnTrue)
            .catch(returnFalse);

          if (!exist) {
            console.log(
              `${app.appName}.git[${index}]: clone - https://github.com/${gitConfig.owner}/${gitConfig.repo}.git ${gitConfig.path}`,
            );
            await simpleGit().clone(
              `https://github.com/${gitConfig.owner}/${gitConfig.repo}.git`,
              abs(gitConfig.path),
            );
            if (gitConfig.rev) {
              console.log(
                `${app.appName}.git[${index}]: checkout - ${gitConfig.rev}`,
              );
              await simpleGit(abs(gitConfig.path)).checkout(gitConfig.rev);
            }
            return;
          }

          console.log(
            `${app.appName}.git[${index}]: exist - ${gitConfig.path}`,
          );
          const git = simpleGit(abs(gitConfig.path));
          const diff = await git.diff();
          if (diff) {
            console.log(
              `${app.appName}.git[${index}]: repositofy is dirty. fetch and checkout is skipped.`,
            );
            return;
          }

          console.log(`${app.appName}.git[${index}]: repositofy is clean.`);
          if (gitConfig.rev) {
            console.log(`${app.appName}.git[${index}]: fetch`);
            await git.fetch();
            console.log(
              `${app.appName}.git[${index}]: checkout - ${gitConfig.rev}`,
            );
            await git.checkout(gitConfig.rev);
            return;
          }

          const branchOutput = (await git.remote(["show", "origin"])) as string;
          const defaultBranch = branchOutput.match(/HEAD branch: (\S+)/)?.[1]!;
          console.log(
            `${app.appName}.git[${index}]: checkout - default branch - ${defaultBranch}`,
          );
          await git.checkout(defaultBranch);
          console.log(`${app.appName}.git[${index}]: git pull`);
          await git.pull();
        }) || [],
      );
    }),
  );

  // create synclink
  await Promise.all(
    // filter if target exist
    filtered.map((app) => {
      return app.configs?.map(async (mapping, index) => {
        console.log(
          `${app.appName}.configs[${index}]: create symlink to ${abs(mapping.target)}`,
        );
        await symlinkAsync(abs(mapping.source), abs(mapping.target));
      });
    }),
  );
};
