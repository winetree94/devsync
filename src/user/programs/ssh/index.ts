import { DevSyncAppConfig } from "@/app";

export const SSHConfig: DevSyncAppConfig = {
  appName: "ssh",
  files: [
    {
      permission: 0o600,
      source: "./src/user/programs/ssh/config",
      target: "~/.ssh/config",
    },
  ],
};
