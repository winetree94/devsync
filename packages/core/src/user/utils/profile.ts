
export interface ProfileSwitchOptions<T> {
  winetree94?: T;
  ila?: T;
  default: T;
}

export const profileSwitch = <T>(chooseType: ProfileSwitchOptions<T>): T => {
  const profile = process.argv.find((arg) => arg.startsWith("--profile="))?.split("=")[1];
  switch (profile) {
    case "winetree94":
      return chooseType.winetree94 ?? chooseType.default;
    case "ila":
      return chooseType.ila ?? chooseType.default;
    default:
      return chooseType.default;
  }
};
