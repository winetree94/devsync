export interface PlatformChooseType<T> {
  darwin?: T;
  linux?: T;
  windows?: T;
  default: T;
}

export const platformChoose = <T>(chooseType: PlatformChooseType<T>): T => {
  switch (process.platform) {
    case "darwin":
      return chooseType.darwin ?? chooseType.default;
    case "linux":
      return chooseType.linux ?? chooseType.default;
    case "win32":
      return chooseType.windows ?? chooseType.default;
    default:
      return chooseType.default;
  }
};
