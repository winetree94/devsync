import { DevSyncAppConfig } from "@/app";
import { platformChoose } from "@/app/utils";

export const NeovimConfig: DevSyncAppConfig = {
  appName: "neovim",
  files: [
    {
      source: "./src/user/programs/neovim/nvim",
      target: platformChoose({
        windows: "~\\AppData\\Local\\nvim",
        default: "~/.config/nvim",
      }),
    },
  ],
};
