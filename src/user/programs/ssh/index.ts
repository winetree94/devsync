import { DevsyncAppConfig } from "@/app";

export const SSHConfig: DevsyncAppConfig = {
  appName: "ssh",
  configs: [
    {
      permission: 0o600,
      source: "./src/user/programs/ssh/config",
      target: "~/.ssh/config",
    },
  ],
};
