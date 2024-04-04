// import path from "path";
import { homedir } from "os";
import { symlink, access, constants } from "fs";

const permissions = constants.S_IRUSR | constants.S_IWUSR; // 읽기 및 쓰기 권한 부여

console.log(permissions);

interface DevsyncConfig {
  configs: DevsyncMappingConfig[];
}

interface DevsyncMappingConfig {
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
        source: "./configs/ssh/config",
        target: "./config",
      },
    ],
  },
];

const homePathToAbsolutePath = (path: string) => {
  return path.replace("~", homedir());
};

const promisify = (fn: Function) => {
  return (...args: any[]) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err: any, ...results: any[]) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  };
};

// symlink async
const linkAsync = promisify(symlink);

// access async
const accessAsync = promisify(access);

// chmod async
// const chmodAsync = promisify(chmod);

(async () => {
  const filtered = await Promise.all(
    samples.map(async (app) => {
      const results = await Promise.all(
        app.configs.map(async (mapping) => {
          const sourceExist = await accessAsync(
            homePathToAbsolutePath(mapping.source),
          )
            .then(() => true)
            .catch(() => null);

          const targetExist = await accessAsync(
            homePathToAbsolutePath(mapping.target),
          )
            .then(() => true)
            .catch(() => null);

          return sourceExist && !targetExist;
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

  console.log(filtered);

  // create synclink
  await Promise.all(
    // filter if target exist
    filtered.map((config) => {
      return config.configs.map(async (mapping) => {
        return linkAsync(
          homePathToAbsolutePath(mapping.source),
          homePathToAbsolutePath(mapping.target),
        ); //.then(() => chmodAsync(homePathToAbsolutePath(mapping.target), 0x600));
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
