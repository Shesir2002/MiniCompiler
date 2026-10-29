
%option noyywrap yylineno

%x COMMENT

%{
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "parser.tab.h"

int lexical_errors = 0;
int comment_start_line = 1;
%}

DIGIT       [0-9]
LETTER      [a-zA-Z_]
ID          {LETTER}[a-zA-Z0-9_]*
FLOATNUM    {DIGIT}+"."{DIGIT}+

%%

[ \t\r]+                    ;
\n                          ;

"//".*                      ;

"/*"                        { comment_start_line = yylineno; BEGIN(COMMENT); }

<COMMENT>"*/"               { BEGIN(INITIAL); }
<COMMENT>\n                 ;
<COMMENT>.                  ;

<COMMENT><<EOF>>            { lexical_errors++; fprintf(stderr, "Lexical Error at line %d: unterminated block comment\n", comment_start_line); return 0; }

"int"                       { return INT; }
"float"                     { return FLOAT; }
"string"                    { return STRING; }
"bool"                      { return BOOL; }
"if"                        { return IF; }
"else"                      { return ELSE; }
"do"                        { return DO; }
"while"                     { return WHILE; }
"print"                     { return PRINT; }

"true"                      { return TRUE; }
"false"                     { return FALSE; }

"=="                        { return EQ; }
"!="                        { return NE; }
"<="                        { return LE; }
">="                        { return GE; }
"&&"                        { return AND; }
"||"                        { return OR; }

{DIGIT}+"."{DIGIT}*"."{DIGIT}* { lexical_errors++; fprintf(stderr, "Lexical Error at line %d: malformed number '%s'\n", yylineno, yytext); }
{DIGIT}+[a-zA-Z_][a-zA-Z0-9_]* { lexical_errors++; fprintf(stderr, "Lexical Error at line %d: malformed number '%s'\n", yylineno, yytext); }

{FLOATNUM}                  { yylval.text = strdup(yytext); return FLOAT_LITERAL; }
{DIGIT}+                    { yylval.text = strdup(yytext); return INT_LITERAL; }

\"([^\"\\\n]|\\.)*\"        { yylval.text = strdup(yytext); return STRING_LITERAL; }
\"([^\"\\\n]|\\.)*          { lexical_errors++; fprintf(stderr, "Lexical Error at line %d: unterminated string literal\n", yylineno); }

{ID}                        { yylval.text = strdup(yytext); return IDENTIFIER; }

[+\-*/%=<>!]                { return yytext[0]; }
[(){};,]                    { return yytext[0]; }

.                           { lexical_errors++; fprintf(stderr, "Lexical Error at line %d: illegal character '%s'\n", yylineno, yytext); }

%%
