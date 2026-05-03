import { keywords, Token, TokenType } from "./token.js";

describe("Token Class", ()=> {
	describe("Creating Single Token", () => {
		test("Plus Sign", () => {
			const lexeme = "+";
			const tok = new Token(TokenType.PLUS, lexeme, null, 0);
			expect(tok.toString()).toBe(`${TokenType.PLUS} ${lexeme} ${null}`);
		});
	});
});
