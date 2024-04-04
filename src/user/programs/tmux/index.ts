import { DevsyncAppConfig } from "@/app";

export const TmuxConfig: DevsyncAppConfig = {
  appName: "tmux",
  git: [
    {
      owner: "tmux-plugins",
      repo: "tpm",
      rev: "99469c4a9b1ccf77fade25842dc7bafbc8ce9946",
      path: "~/.tmux/plugins/tpm",
    },
  ],
  configs: [
    {
      permission: 0o644,
      source: "./src/user/programs/tmux/.tmux.conf",
      target: "~/.tmux.conf",
    },
  ],
};
