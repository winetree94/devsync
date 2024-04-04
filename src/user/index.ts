import { run } from "@/app";
import { SSHConfig } from "./programs/ssh";
import { GitConfig } from "./programs/git";
import { TmuxConfig } from "./programs/tmux";
import { NeovimConfig } from "./programs/neovim";

run({
  apps: [SSHConfig, GitConfig, TmuxConfig, NeovimConfig],
});
