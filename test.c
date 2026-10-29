#include <stdio.h>

extern int yyparse(void);
extern int syntax_errors;
extern int lexical_errors;

int main(void)
{
    printf("Enter your Mini-Compiler code.\n");
    printf("Press Ctrl+Z, then Enter, when finished.\n");

    int result = yyparse();

    if (result == 0 && syntax_errors == 0 && lexical_errors == 0) {
        printf("Parsing successful!\n");
        return 0;
    }

    printf("Parsing failed. Syntax errors: %d, Lexical errors: %d\n",
           syntax_errors, lexical_errors);

    return 1;
}
