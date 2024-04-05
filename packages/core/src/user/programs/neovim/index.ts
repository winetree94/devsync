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

// export const B = {
//   binary: platformSwitch({
//     win32: Winget('neovim.neovim'),
//     darwin: Brew('neovim'),
//   }),
// }
