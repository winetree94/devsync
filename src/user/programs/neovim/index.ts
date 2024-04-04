import { DevSyncAppConfig } from "@/app";

export const NeovimConfig: DevSyncAppConfig = {
  appName: "neovim",
  files: [
    {
      source: "./src/user/programs/neovim/nvim",
      target: "~/.config/nvim",
    },
  ],
};
