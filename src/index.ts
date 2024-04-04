// import path from "path";
import { homedir } from "os";
import { symlink, access, constants, rm } from "fs";
import path from "path";

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
        target: "~/.ssh/config",
      },
    ],
  },
];

const homePathToAbsolutePath = (path: string) => {
  return path.replace("~", homedir());
};

const abs = (strPath: string) => {
  return path.resolve(strPath.replace("~", homedir()));
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
const symlinkAsync = promisify(symlink);

// access async
const accessAsync = promisify(access);

// rm async
const rmAsync = promisify(rm);

(async () => {
  const filtered = await Promise.all(
    samples.map(async (app) => {
      const results = await Promise.all(
        app.configs.map(async (mapping) => {
          const sourceExist = await accessAsync(abs(mapping.source))
            .then(() => true)
            .catch(() => null);

          const targetExist = await accessAsync(abs(mapping.target))
            .then(() => true)
            .catch(() => null);

          if (targetExist) {
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
        return symlinkAsync(abs(mapping.source), abs(mapping.target)); //.then(() => chmodAsync(homePathToAbsolutePath(mapping.target), 0x600));
      });
    }),
  );
})();
