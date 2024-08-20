import { DevSyncAppConfig, platformSwitch } from '@devsynk/core';

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
    {
      source: platformSwitch({
        darwin: './src/programs/zsh/.zprofile_darwin.sh',
        linux: './src/programs/zsh/.zprofile_linux.sh',
        default: './src/programs/zsh/.zprofile_default.sh',
      }),
      target: '~/.zprofile.sh',
      permission: 0o755,
    },
  ],
};
