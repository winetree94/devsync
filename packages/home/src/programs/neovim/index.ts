import { DevSyncAppConfig, platformSwitch } from '@devsynk/core';

export const NeovimConfig: DevSyncAppConfig = {
  appName: 'neovim',
  packages: [
    platformSwitch({
      win32: 'Neovim.Neovim',
      default: 'neovim',
    }),
    platformSwitch({
      win32: 'BurntSushi.ripgrep.GNU',
      default: 'ripgrep',
    }),
    platformSwitch({
      win32: 'sharkdp.fd',
      default: 'fd',
    }),
    platformSwitch({
      win32: 'dundee.gdu',
      default: 'gdu',
    }),
    platformSwitch({
      win32: 'Clement.bottom',
      default: 'bottom',
    }),
    platformSwitch({
      win32: 'JesseDuffield.lazygit',
      default: 'lazygit',
    }),
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
