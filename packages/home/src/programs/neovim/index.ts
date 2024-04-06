import { DevSyncAppConfig, platformSwitch } from '@devsynk/core';

export const NeovimConfig: DevSyncAppConfig = {
  appName: 'neovim',
  files: [
    {
      source: './src/programs/neovim/nvim',
      target: platformSwitch({
        win32: '~\\AppData\\Local\\nvim',
        default: '~/.config/nvim',
      }),
    },
    // {
    //   source: './src/programs/neovim/nvim',
    //   target: platformSwitch({
    //     win32: '~\\AppData\\Local\\nvim',
    //     default: '~/.config/nvim',
    //   }),
    // },
  ],
};

// export const B = {
//   binary: platformSwitch({
//     win32: Winget('neovim.neovim'),
//     darwin: Brew('neovim'),
//   }),
// }
