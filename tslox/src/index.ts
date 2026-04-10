import { LoxRunner } from "./runner.js";

const args = process.argv.slice(2);
const loxRunner = new LoxRunner();
loxRunner.execute(args);
