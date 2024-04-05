import { DevSyncAppConfig } from '@devsynk/core';
import { profileSwitch } from '@/utils';

export const GitConfig: DevSyncAppConfig = {
  appName: 'git',
  files: [
    {
      source: profileSwitch({
        ila: './src/programs/git/.gitconfig.ila',
        default: './src/programs/git/.gitconfig.winetree94',
      }),
      target: '~/.gitconfig',
    },
  ],
};
