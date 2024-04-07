import { homedir } from 'os';
import path from 'path';

export const abs = (strPath: string) => {
  return path.resolve(strPath.replace('~', homedir()));
};
