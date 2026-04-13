import { LoxContext } from "./context.js";
import { Keyword, keywords, Token, TokenType } from "./token.js";

export class Scanner {
  ctx: LoxContext;
  source: string;

  private start = 0;
  private current = 0;
  private line = 1;
  private tokens: Token[] = [];

  constructor(source: string, ctx: LoxContext) {
    this.source = source;
    this.ctx = ctx;
  }

  scanTokens(): Token[] {
    this.start = this.current;
    while (!this.isAtEnd()) {
      this.scanToken();
    }
    this.tokens.push(new Token(TokenType.EOF, "", null, this.line));
    return this.tokens;
  }

  private scanToken() {
    let c = this.advance();
    switch (c) {
      case "(":
        this.addToken(TokenType.LEFT_PAREN);
        break;
      case ")":
        this.addToken(TokenType.RIGHT_PAREN);
        break;
      case "{":
        this.addToken(TokenType.LEFT_BRACE);
        break;
      case "}":
        this.addToken(TokenType.RIGHT_BRACE);
        break;
      case ",":
        this.addToken(TokenType.COMMA);
        break;
      case ".":
        this.addToken(TokenType.DOT);
        break;
      case "-":
        this.addToken(TokenType.MINUS);
        break;
      case "+":
        this.addToken(TokenType.PLUS);
        break;
      case ";":
        this.addToken(TokenType.SEMICOLON);
        break;
      case "*":
        this.addToken(TokenType.STAR);
      case "!":
        this.match("=")
          ? this.addToken(TokenType.BANG_EQUAL)
          : this.addToken(TokenType.BANG);
        break;
      case "=":
        this.match("=")
          ? this.addToken(TokenType.EQUAL_EQUAL)
          : this.addToken(TokenType.EQUAL);
        break;
      case "<":
        this.match("=")
          ? this.addToken(TokenType.LESS_EQUAL)
          : this.addToken(TokenType.LESS);
        break;
      case ">":
        this.match("=")
          ? this.addToken(TokenType.GREATER_EQUAL)
          : this.addToken(TokenType.GREATER);
        break;
      case "/":
        if (this.match("/")) {
          while (this.peek() != "\n" && !this.isAtEnd()) {
            this.advance();
          }
        } else {
          this.addToken(TokenType.SLASH);
        }
        break;

      case " ":
      case "\r":
      case "\t":
        break;

      case "\n":
        this.line++;
        break;

      case '"':
        this.tokenizeString();
        break;

      default:
        if (this.isDigit(c)) {
          this.tokenizeNumber();
        } else if (this.isAlpha(c)) {
          this.tokenizeIdentifer();
        } else {
          this.ctx.error(this.line, "Unexpected character.");
        }
    }
  }

  // move one character down the source and return current char
  private advance() {
    return this.source.at(this.current++);
  }

  // look at the next character
  private peek() {
    if (this.isAtEnd()) {
      return undefined;
    }
    return this.source.at(this.current);
  }

  // look at the next next character
  // don't want too many look aheads
  private peekNext() {
    if (this.current + 1 >= this.source.length) {
      return undefined;
    }
    return this.source.at(this.current + 1);
  }

  // look ahead 1 char for lexeme edge cases
  private match(expected: string) {
    if (this.isAtEnd()) return false;
    // note to self: this.current is actually the next char (confusing i know)
    // this is due to advance incrementing this.current++ so the char returned is current but not the this.current pointer (lol)
    if (this.source.charAt(this.current) != expected) return false;

    // accept the look ahead as valid
    this.current++;
    return true;
  }

  private addToken(token: TokenType) {
    this.addTokenWLiteral(token, null);
  }

  private addTokenWLiteral(token: TokenType, literal: any) {
    let text = this.source.substring(this.start, this.current);
    this.tokens.push(new Token(token, text, literal, this.line));
  }

  private isAtEnd() {
    return this.current >= this.source.length;
  }

  private isDigit(char: string | undefined) {
    if (char === undefined) {
      return false;
    }
    return /^\d$/.test(char);
  }

  private isAlpha(char: string | undefined) {
    if (char === undefined) {
      return false;
    }
    return /^[a-zA-Z_]/.test(char);
  }

  private isAlphaDigit(char: string | undefined) {
    return this.isAlpha(char) && this.isDigit(char);
  }

  private tokenizeString() {
    while (!this.isAtEnd() && this.peek() != '"') {
      //Supports multilined string
      if (this.peek() == "\n") {
        this.line++;
      }
      this.advance();
    }
    // advance past the closing \"
    this.advance();

    const value = this.source.substring(this.start + 1, this.current - 1);
    this.addTokenWLiteral(TokenType.STRING, value);
  }

  private tokenizeNumber() {
    while (!this.isAtEnd() && this.isDigit(this.peek())) {
      this.advance();
    }

    // Ensuring fractional digit exists before consuming decimal
    if (this.peek() == "." && this.isDigit(this.peekNext())) {
      this.advance();
      while (this.isDigit(this.peek())) {
        this.advance();
      }
    }

    this.addTokenWLiteral(
      TokenType.NUMBER,
      Number(this.source.substring(this.start, this.current)),
    );
  }

  private tokenizeIdentifer() {
    while (!this.isAtEnd() && this.isAlphaDigit(this.peek())) {
      this.advance();
    }

    const lexeme = this.source.substring(this.start, this.current);
    const tokenType = keywords[lexeme as Keyword] ?? TokenType.IDENTIFIER;
    this.addToken(tokenType);
  }
}
