// import path from "path";
import { symlink, access, chmod, constants } from "fs";

const permissions = constants.S_IRUSR | constants.S_IWUSR; // 읽기 및 쓰기 권한 부여

interface DevsyncConfig {
  configs: DevsyncMappingConfig[];
}

interface DevsyncMappingConfig {
  source: string;
  target: string;
}

const samples: DevsyncConfig[] = [
  {
    configs: [
      {
        source: "./test/sample.txt",
        target: "./test/sample-link.txt",
      },
    ],
  },
  // {
  //   configs: [
  //     {
  //       source: "./index.ts",
  //       target: "./index.lua",
  //     },
  //   ],
  // },
  // {
  //   configs: [
  //     {
  //       source: "./tmux.conf",
  //       target: "~/.tmux.conf",
  //     },
  //   ],
  // },
];

// symlink async
const symlinkAsync = (source: string, target: string) => {
  return new Promise<void>((resolve, reject) => {
    symlink(source, target, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

// access async
const accessAsync = (path: string) => {
  return new Promise<void>((resolve, reject) => {
    access(path, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

// chmod async
const chmodAsync = (path: string, mode: number) => {
  return new Promise<void>((resolve, reject) => {
    chmod(path, mode, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

(async () => {
  const filtered = await Promise.all(
    samples.map(async (config) => {
      const results = await Promise.all(
        config.configs.map(async (mapping) => {
          try {
            await Promise.all([
              accessAsync(mapping.source),
              accessAsync(mapping.target),
            ]);
            return true;
          } catch (e) {
            return false;
          }
        }),
      );

      return {
        ...config,
        configs: config.configs.filter((_, index) => {
          return results[index];
        }),
      };
    }),
  );

  console.log(filtered);

  // create synclink
  await Promise.all(
    // filter if target exist
    filtered.map((config) => {
      return config.configs.map(async (mapping) => {
        return symlinkAsync(mapping.source, mapping.target).then(() =>
          chmodAsync(mapping.target, permissions),
        );
      });
    }),
  );
})();

console.log(samples);
console.log(process.cwd());

// program
//   .name("devsync")
//   .option("-v, --version", "Output the version number", "0.0.1")
//   .description("A tool to sync your development environment");
//
// program.parse(process.argv);
