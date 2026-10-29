
#include <iostream>
#include <cstdio>
#include <vector>
#include <memory>
#include <string>

#include "ast.hpp"
#include "semantic.hpp"

extern int yyparse(void);
extern FILE* yyin;
extern int yylineno;
extern int syntax_errors;
extern int lexical_errors;

std::vector<StmtPtr> programStatements;

int main(int argc, char* argv[])
{
    if (argc > 2) {
        std::cerr << "Usage: ./mini_compiler.exe [input_file]\n";
        return 1;
    }

    if (argc == 2) {
        yyin = fopen(argv[1], "r");

        if (yyin == nullptr) {
            std::cerr << "Error: Could not open input file: "
                      << argv[1] << '\n';
            return 1;
        }
    } else {
        yyin = stdin;
        std::cout << "Mini Compiler\n";
        std::cout << "Enter code, then press Ctrl+Z and Enter to finish.\n\n";
    }

    int parseResult = yyparse();

    if (argc == 2 && yyin != nullptr) {
        fclose(yyin);
    }

    if (parseResult != 0 || syntax_errors > 0 || lexical_errors > 0) {
        std::cout << "\nCompilation stopped because of lexical or syntax errors.\n";
        return 1;
    }

    std::cout << "\nSyntax analysis successful!\n";

    SemanticAnalyzer analyzer;
    int semanticErrors = analyzer.analyze(programStatements);

    if (semanticErrors > 0) {
        std::cout << "Compilation failed during semantic analysis.\n";
        return 1;
    }

    std::cout << "\nCompilation successful!\n";
    return 0;
}
