/* eslint-disable @typescript-eslint/no-floating-promises */
import { run, platformSwitch } from '@devsynk/core';
import { SSHConfig } from './programs/ssh';
import { GitConfig } from './programs/git';
import { TmuxConfig } from './programs/tmux';
import { NeovimConfig } from './programs/neovim';
import { ZSHConfig } from './programs/zsh';

run({
  apps: [
    ZSHConfig,
    SSHConfig,
    GitConfig,
    NeovimConfig,
    ...platformSwitch({
      win32: [],
      default: [TmuxConfig],
    }),
  ],
});
