import { DevSyncAppConfig } from "@/app";

export const GitConfig: DevSyncAppConfig = {
  appName: "git",
  files: [
    {
      source: "./src/user/programs/git/.gitconfig",
      target: "~/.gitconfig",
    },
  ],
};
