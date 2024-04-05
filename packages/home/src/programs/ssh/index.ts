import { DevSyncAppConfig } from '@devsynk/core';

export const SSHConfig: DevSyncAppConfig = {
  appName: 'ssh',
  files: [
    {
      permission: 0o600,
      source: './src/programs/ssh/config',
      target: '~/.ssh/config',
    },
  ],
};
