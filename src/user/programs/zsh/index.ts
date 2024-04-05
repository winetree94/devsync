import { DevSyncAppConfig } from "@/app";

export const ZSHConfig: DevSyncAppConfig = {
  appName: "zsh",
  git: [
    // {
    //   owner: "mattmc3",
    //   repo: "antidote",
    //   path: "~/.antidote",
    // }
  ],
  files: [
    {
      source: "./src/user/programs/zsh/.zshrc",
      target: "~/.zshrc",
    },
    // {
    //   source: "./src/user/programs/zsh/.zsh_plugins.txt",
    //   target: "~/.zsh_plugins.txt",
    // },
  ],
};
