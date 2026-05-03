import { TokenType } from "./token.js";
import { LoxContext } from "./context.js";
import { Scanner } from "./scanner.js";


function scan(source: string) {
	return new Scanner(source, new LoxContext());
}

describe("Scanner Test", () => {
	describe("Single Token Samples", () => {
		test.each([
			{token: "(", expectedType: TokenType.LEFT_PAREN},
			{token: ")", expectedType: TokenType.RIGHT_PAREN},
			{token: "}", expectedType: TokenType.RIGHT_BRACE},
			{token: "{", expectedType: TokenType.LEFT_BRACE},
			{token: ",", expectedType: TokenType.COMMA},
			{token: ".", expectedType: TokenType.DOT},
			{token: "-", expectedType: TokenType.MINUS},
			{token: "+", expectedType: TokenType.PLUS},
			{token: ";", expectedType: TokenType.SEMICOLON},
			{token: "*", expectedType: TokenType.STAR},
			{token: "!", expectedType: TokenType.BANG},
			{token: "=", expectedType: TokenType.EQUAL},
			{token: "<", expectedType: TokenType.LESS},
			{token: ">", expectedType: TokenType.GREATER},
			{token: "/", expectedType: TokenType.SLASH},
		])("case %s", ({token, expectedType}) => {
			const tokens = scan(token).scanTokens()	
			expect(tokens[0].type).toBe(expectedType);
			expect(tokens[1].type).toBe(TokenType.EOF);
		});
	})
});
