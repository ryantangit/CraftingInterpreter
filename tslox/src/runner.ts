import fs from 'node:fs'
import * as readline from 'node:readline'
import { Scanner } from './scanner.js';
import { LoxContext } from './context.js';
import { SysExitCode } from './sysexit.js';


export class LoxRunner {

	ctx: LoxContext;
	constructor(ctx: LoxContext) {
		this.ctx = ctx;
	}

	private runFile(filepath: string) {
		const data = fs.readFileSync(filepath, {encoding: "utf8"});
		this.run(data);

		if (this.ctx.hadError) {
			process.exit(SysExitCode.EX_DATAERR)
		}
	}

	private runPrompt() {
		const rl = readline.createInterface({input: process.stdin, output: process.stdout})
		rl.prompt();

		rl.on('line', (line)=> {
			this.run(line);
			rl.prompt();
		}).on('close', () => {
			console.log("\nTerminating tslox, see ya!");
			process.exit(SysExitCode.EX_OK);
		});
		this.ctx.hadError = false;
	}

	private run(input: string) {
		const scanner = new Scanner(input);
		const tokens = scanner.scanTokens();

		for (const token of tokens) {
			console.log(token);
		}
	}

	execute(args: string[]) {
		if (args.length > 1) {
			console.log("Usage tslox [script]");
			process.exit(64);
		} else if (args.length == 1) {
			this.runFile(args[0]);
		} else {
			this.runPrompt();
		}
	}
}
