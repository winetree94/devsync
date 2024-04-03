// import path from "path";
import { symlink, access } from "fs";

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

(async () => {
  const filtered = Promise.all(
    samples.map((config) => {
      return config.configs.map((mapping) => {
        return accessAsync(mapping.source).then(
          () => mapping,
          (err) => {
            console.error(`Error: ${err}`);
            return null;
          },
        );
      });
    }),
  );

  // create synclink
  await Promise.all(
    // filter if target exist
    filtered.map((config) => {
      return config.configs.map((mapping) => {
        return symlinkAsync(mapping.source, mapping.target);
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
