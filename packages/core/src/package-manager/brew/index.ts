export interface BrewPackageDefinition {
  packageName: string;
}

export const Brew = (configs: BrewPackageDefinition) => {
  return {
    checkInstall: async () => {},
    installScript: async () => {},
    postInstall: async () => {},
  };
};
