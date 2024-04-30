import { DevSyncAppConfig } from '@devsynk/core';

export const ZSHConfig: DevSyncAppConfig = {
  appName: 'zsh',
  git: [],
  files: [
    {
      source: './src/programs/zsh/.zshrc',
      target: '~/.zshrc',
    },
    {
      source: './src/programs/zsh/.zprofile',
      target: '~/.zprofile',
    },
  ],
};
