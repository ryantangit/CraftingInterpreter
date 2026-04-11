import { LoxRunner } from "./runner.js";
import { LoxContext } from "./context.js";

const args = process.argv.slice(2);
const loxRunner = new LoxRunner(LoxContext.newCtx());
loxRunner.execute(args);
