import { abs, accessAsync, rmAsync, symlinkAsync } from "./utils";
import { git } from "./git";

export interface DevsyncConfigs {
  apps: DevsyncAppConfig[];
}

export interface DevsyncGitconfigs {
  owner: string;
  repo: string;
  rev?: string;
  path: string;
}

export interface DevsyncAppConfig {
  appName: string;
  git?: DevsyncGitconfigs[];
  configs: DevsyncAppPath[];
}

export interface DevsyncAppPath {
  action?: "override";
  permission?: number;
  source: string;
  target: string;
}

export const run = async (config: DevsyncConfigs) => {
  const filtered = await Promise.all(
    config.apps.map(async (app) => {
      const results = await Promise.all(
        app.configs.map(async (mapping) => {
          const sourceExist = await accessAsync(abs(mapping.source)).then(
            () => true,
          );

          const targetExist = await accessAsync(abs(mapping.target))
            .then(() => true)
            .catch(() => null);

          if (targetExist) {
            console.warn(mapping.source, "Target exist, removing target");
            await rmAsync(abs(mapping.target));
          }

          return sourceExist;
        }),
      );

      return {
        ...app,
        configs: app.configs.filter((_, index) => {
          return results[index];
        }),
      };
    }),
  );

  await Promise.all(
    filtered.map(async (app) => {
      await Promise.all(
        app.git?.map(async (gitConfig) => {
          try {
            await rmAsync(abs(gitConfig.path), { recursive: true });
          } catch (error) {
            console.error(error);
          }
          await git.clone(
            `https://github.com/${gitConfig.owner}/${gitConfig.repo}.git`,
            abs(gitConfig.path),
          );
        }) || [],
      );
    }),
  );

  // create synclink
  await Promise.all(
    // filter if target exist
    filtered.map((config) => {
      return config.configs.map(async (mapping) => {
        return symlinkAsync(abs(mapping.source), abs(mapping.target));
      });
    }),
  );
};
