import fs from 'node:fs'
import * as readline from 'node:readline'

export class LoxRunner {
	private runFile(filepath: string) {
		const data = fs.readFileSync(filepath, {encoding: "utf8"});
		this.run(data);
	}

	private runPrompt() {
		const rl = readline.createInterface({input: process.stdin, output: process.stdout})
		rl.prompt();

		rl.on('line', (line)=> {
			this.run(line);
			rl.prompt();
		}).on('close', () => {
			console.log("\nTerminating tslox, see ya!");
			process.exit(0);
		});


	}

	private run(input: string) {
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
