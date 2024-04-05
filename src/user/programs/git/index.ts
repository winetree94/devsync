import { DevSyncAppConfig } from "@/app";
import { profileSwitch } from "@/user/utils/profile";

export const GitConfig: DevSyncAppConfig = {
  appName: "git",
  files: [
    {
      source: profileSwitch({
        ila: "./src/user/programs/git/.gitconfig.ila",
        default: "./src/user/programs/git/.gitconfig.winetree94",
      }),
      target: "~/.gitconfig",
    },
  ],
};

