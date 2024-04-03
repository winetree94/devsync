import path from "path";
import sample from "./sample.json";

import { program } from "commander";

console.log(path);

console.log(sample);

program
  .name("devsync")
  .option("-v, --version", "Output the version number", "0.0.1")
  .description("A tool to sync your development environment");

program.parse(process.argv);
