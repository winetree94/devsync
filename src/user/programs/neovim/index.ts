import { DevSyncAppConfig } from "@/app";
import { platformSwitch } from "@/app/utils";

export const NeovimConfig: DevSyncAppConfig = {
  appName: "neovim",
  files: [
    {
      source: "./src/user/programs/neovim/nvim",
      target: platformSwitch({
        win32: "~\\AppData\\Local\\nvim",
        default: "~/.config/nvim",
      }),
    },
  ],
};
