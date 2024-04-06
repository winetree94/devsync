import { exec, execSync } from 'child_process';
import {
  abs,
  accessAsync,
  mkdirAsync,
  returnFalse,
  returnTrue,
  rmAsync,
  symlinkAsync,
} from './utils';
import simpleGit from 'simple-git';

export * from './utils';

export interface DevsyncConfigs {
  apps: DevSyncAppConfig[];
}

export interface DevSyncGitconfigs {
  owner: string;
  repo: string;
  rev?: string;
  path: string;
}

export interface DevSyncPackageDefinition {
  packageName: string;
}

export interface DevSyncAppConfig {
  appName: string;
  packages?: (DevSyncPackageDefinition | string)[];
  git?: DevSyncGitconfigs[];
  files?: DevSyncFileConfig[];
}

export interface DevSyncFileConfig {
  permission?: number;
  source: string;
  target: string;
}

const convertToDevSyncPackageDefinition = (
  packageName: string | DevSyncPackageDefinition,
): DevSyncPackageDefinition => {
  if (typeof packageName === 'string') {
    return {
      packageName,
    };
  }
  return packageName;
};

export const run = async (config: DevsyncConfigs) => {
  // await Promise.all(
  //   config.apps.map(
  //     (app) =>
  //       new Promise((resolve, reject) => {
  //         const packages =
  //           app.packages?.map(convertToDevSyncPackageDefinition) || [];
  //         const packageNames = packages.map((pkg) => pkg.packageName);
  //         if (!packageNames.length) {
  //           return;
  //         }
  //         const command = `brew install ${packageNames.join(' ')}`;
  //         console.log(command);

  //         exec(command, (error, stdout, stderr) => {
  //           if (error) {
  //             console.error(`exec error: ${stdout}`);
  //             console.error(`stderr: ${stderr}`);
  //             reject(error);
  //             return;
  //           }
  //           console.log(`stdout: ${stdout}`);
  //           resolve(stdout);
  //         });
  //       }),
  //   ),
  // );

  await Promise.all(
    config.apps.map(async (app) => {
      const results = await Promise.all(
        app.files?.map(async (file, index) => {
          console.log(`${app.appName}.files[${index}]: checking`);
          await accessAsync(abs(file.source)).then(returnTrue);

          const targetExist = await accessAsync(abs(file.target))
            .then(returnTrue)
            .catch(returnFalse);

          if (!targetExist) {
            console.log(`${app.appName}.files[${index}]: target not exist`);
            await rmAsync(abs(file.target), { recursive: true })
              .then(returnTrue)
              .catch(returnFalse);
            const lastTargetPath = file.target
              .split('/')
              .slice(0, -1)
              .join('/');
            const targetDirExist = await accessAsync(abs(lastTargetPath))
              .then(returnTrue)
              .catch(returnFalse);
            if (!targetDirExist) {
              console.log(
                `${app.appName}.files[${index}]: create target directory`,
              );
              await mkdirAsync(abs(lastTargetPath), { recursive: true });
            }
            console.log(
              `${app.appName}.files[${index}]: create symlink to ${abs(file.target)}`,
            );
            await symlinkAsync(abs(file.source), abs(file.target));
            return;
          }

          console.log(`${app.appName}.files[${index}]: target exist`);
          console.log(`${app.appName}.files[${index}]: removing target`);
          await rmAsync(abs(file.target), { recursive: true });
          console.log(
            `${app.appName}.files[${index}]: create symlink to ${abs(file.target)}`,
          );
          await symlinkAsync(abs(file.source), abs(file.target));
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
    config.apps.map(async (app) => {
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

          const branchOutput = (await git.remote(['show', 'origin'])) as string;
          const defaultBranch = branchOutput.match(/HEAD branch: (\S+)/)?.[1];
          console.log(
            `${app.appName}.git[${index}]: checkout - default branch - ${defaultBranch}`,
          );
          await git.checkout(defaultBranch!);
          console.log(`${app.appName}.git[${index}]: git pull`);
          await git.pull();
        }) || [],
      );
    }),
  );
};
