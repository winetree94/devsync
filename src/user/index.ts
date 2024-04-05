import { run } from "@/app";
import { SSHConfig } from "./programs/ssh";
import { GitConfig } from "./programs/git";
import { TmuxConfig } from "./programs/tmux";
import { NeovimConfig } from "./programs/neovim";
import { ZSHConfig } from "./programs/zsh";
import { platformSwitch } from "@/app/utils";

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
