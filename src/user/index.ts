import { run } from "@/app";
import { SSHConfig } from "./programs/ssh";
import { GitConfig } from "./programs/git";
import { TmuxConfig } from "./programs/tmux";
import { NeovimConfig } from "./programs/neovim";
import { ZSHConfig } from "./programs/zsh";

run({
  apps: [ZSHConfig, SSHConfig, GitConfig, TmuxConfig, NeovimConfig],
});
