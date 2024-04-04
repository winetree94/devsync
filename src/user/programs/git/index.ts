import { DevsyncAppConfig } from "@/app";

export const GitConfig: DevsyncAppConfig = {
  appName: "git",
  configs: [
    {
      source: "./src/user/programs/git/.gitconfig",
      target: "~/.gitconfig",
    },
  ],
};
