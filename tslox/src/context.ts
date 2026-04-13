export class LoxContext {
  hadError: boolean = false;

  static newCtx(): LoxContext {
    return new LoxContext();
  }

  error(line: number, message: string) {
    this.report(line, "", message);
  }

  report(line: number, where: string, message: string) {
    console.error(`"[line "${line}"] Error" ${where}: ${message}`);
    this.hadError = true;
  }
}
