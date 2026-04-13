# Scanning


## 4.1 The interpreter framework
- I'm going to be using typescript for this interpreter.
- set up a node project 

### 4.1.1 Error Handling 
- One thing I noticed here is that the Java code uses a static `hadError` to track errors
    1. I'm trying a context object approach instead, I feel like debugging this static variable is going to annoying

- Uses magic numbers for exit code, but it's probably cleaner to write out an enum with the numbers mapped.

- Note the author did mention:
> "Ideally, we would have an actual abstraction, some kind of “ErrorReporter” interface that gets passed to the scanner and parser so that we can swap out different reporting strategies. For our simple interpreter here, I didn’t do that, but I did at least move the code for error reporting into a different class."

## 4.2 Lexemes and Token
- lexeme = "blobs of characters that still represent something"
- lexeme bundled with other data -> token

### 4.2.1 Token Type
- keywords are part of the the language grammar
- use enums to represent what kind of lexeme it represents

## 4.3 Regular Languages and Expressions
- Core of the scanner is a loop
- start at the first character -> scanner figures out what lexeme the string belongs to, spits out a token
- Could use regex for each of the lexeme 

## 4.4 The Scanner class
- the scanner has states - start, current, and line

## 4.5 Recognizing Lexemes
- At each turn fo the loop we scan a token, imagine we just have to consume 1 character.
- most notable things to rmr the `advance`, `peek`, and `match` function
- comments go until a newline char is encountered

## 4.7 Reserved Words and Identifiers
- maximal munch: when two lexical grammar rules can match a chunk, whichever matches the most wins.
- learned a lil neat trick for typing keys
```ts
    
   export const mapping {
    "foo1": "bar",
    "foo2": "bar2",
   } as const;

   //mappingKey will be typed to "foo1" | "foo2"
   export const mappingKey = keyof typeof mapping 
```
