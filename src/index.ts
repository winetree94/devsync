// import path from "path";
import fs from "fs";
import { abs, accessAsync, rmAsync, symlinkAsync } from "./utils";

const permissions = fs.constants.S_IRUSR | fs.constants.S_IWUSR; // 읽기 및 쓰기 권한 부여

interface DevsyncConfig {
  configs: DevsyncMappingConfig[];
}

interface DevsyncMappingConfig {
  permission: number;
  source: string;
  target: string;
}

const samples: DevsyncConfig[] = [
  // {
  //   configs: [
  //     {
  //       source: "./test/sample.txt",
  //       target: "./test/sample-link.txt",
  //     },
  //   ],
  // },
  {
    configs: [
      {
        permission: 0o600,
        source: "./configs/ssh/config",
        target: "~/.ssh/config",
      },
    ],
  },
];

(async () => {
  const filtered = await Promise.all(
    samples.map(async (app) => {
      const results = await Promise.all(
        app.configs.map(async (mapping) => {
          const sourceExist = await accessAsync(abs(mapping.source)).then(
            () => true,
          );

          const targetExist = await accessAsync(abs(mapping.target))
            .then(() => true)
            .catch(() => null);

          if (targetExist) {
            console.warn("Target exist, removing target");
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

  // create synclink
  await Promise.all(
    // filter if target exist
    filtered.map((config) => {
      return config.configs.map(async (mapping) => {
        return symlinkAsync(abs(mapping.source), abs(mapping.target));
      });
    }),
  );
})();
