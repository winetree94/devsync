export interface PlatformSwitchOptions<T> {
  aix?: T;
  android?: T;
  darwin?: T;
  freebsd?: T;
  haiku?: T;
  linux?: T;
  openbsd?: T;
  sunos?: T;
  win32?: T;
  cygwin?: T;
  netbsd?: T;
  default: T;
}

export const platformSwitch = <T>(chooseType: PlatformSwitchOptions<T>): T => {
  switch (process.platform) {
    case "aix":
      return chooseType.aix ?? chooseType.default;
    case "android":
      return chooseType.android ?? chooseType.default;
    case "darwin":
      return chooseType.darwin ?? chooseType.default;
    case "freebsd":
      return chooseType.freebsd ?? chooseType.default;
    case "haiku":
      return chooseType.haiku ?? chooseType.default;
    case "linux":
      return chooseType.linux ?? chooseType.default;
    case "openbsd":
      return chooseType.openbsd ?? chooseType.default;
    case "sunos":
      return chooseType.sunos ?? chooseType.default;
    case "win32":
      return chooseType.win32 ?? chooseType.default;
    case "cygwin":
      return chooseType.cygwin ?? chooseType.default;
    case "netbsd":
      return chooseType.netbsd ?? chooseType.default;
    default:
      return chooseType.default;
  }
};

export interface ArchSwitchOptions<T> {
  arm?: T;
  arm64?: T;
  ia32?: T;
  mips?: T;
  mipsel?: T;
  ppc?: T;
  ppc64?: T;
  risccv64?: T;
  s390?: T;
  s390x?: T;
  x64?: T;
  default: T;
}

export const archSwitch = <T>(chooseType: ArchSwitchOptions<T>): T => {
  switch (process.arch) {
    case "arm":
      return chooseType.arm ?? chooseType.default;
    case "arm64":
      return chooseType.arm64 ?? chooseType.default;
    case "ia32":
      return chooseType.ia32 ?? chooseType.default;
    case "mips":
      return chooseType.mips ?? chooseType.default;
    case "mipsel":
      return chooseType.mipsel ?? chooseType.default;
    case "ppc":
      return chooseType.ppc ?? chooseType.default;
    case "ppc64":
      return chooseType.ppc64 ?? chooseType.default;
    case "riscv64":
      return chooseType.risccv64 ?? chooseType.default;
    case "s390":
      return chooseType.s390 ?? chooseType.default;
    case "s390x":
      return chooseType.s390x ?? chooseType.default;
    case "x64":
      return chooseType.x64 ?? chooseType.default;
    default:
      return chooseType.default;
  }
};
