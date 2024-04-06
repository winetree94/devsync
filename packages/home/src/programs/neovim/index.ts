import { DevSyncAppConfig, platformSwitch } from '@devsynk/core';

export const NeovimConfig: DevSyncAppConfig = {
  appName: 'neovim',
  packages: [
    platformSwitch({
      win32: 'neovim',
      default: 'neovim',
    }),
    'ripgrep',
    'fd',
    'gdu',
    'bottom',
    'lazygit',
  ],
  files: [
    {
      source: './src/programs/neovim/nvim',
      target: platformSwitch({
        win32: '~\\AppData\\Local\\nvim',
        default: '~/.config/nvim',
      }),
    },
  ],
};
