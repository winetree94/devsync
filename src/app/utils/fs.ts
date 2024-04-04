import fs from "fs";
import { promisify } from "util";

export const symlinkAsync = promisify(fs.symlink);

export const accessAsync = promisify(fs.access);

export const rmAsync = promisify(fs.rm);

export const chmodAsync = promisify(fs.chmod);
