
%code requires {
#include "ast.hpp"
#include <vector>
}

%{
#include <cstdio>
#include <cstdlib>
#include <iostream>
#include <string>
#include <utility>
#include "ast.hpp"

extern int yylex(void);
extern int yylineno;
extern int lexical_errors;
extern std::vector<StmtPtr> programStatements;

void yyerror(const char *message);

int syntax_errors = 0;
%}

%define parse.error verbose

%union {
    char *text;
    DataType dataType;
    Expression *expr;
    Statement *stmt;
    std::vector<StmtPtr> *statements;
}

%token <text> IDENTIFIER
%token <text> INT_LITERAL
%token <text> FLOAT_LITERAL
%token <text> STRING_LITERAL

%token INT FLOAT STRING BOOL
%token IF ELSE DO WHILE PRINT
%token TRUE FALSE
%token EQ NE LE GE AND OR

%type <dataType> type
%type <expr> expression
%type <stmt> statement declaration assignment print_statement
%type <stmt> if_statement while_statement do_while_statement block
%type <statements> statement_list

%destructor { free($$); } <text>
%destructor { delete $$; } <expr> <stmt> <statements>

%left OR
%left AND
%left EQ NE
%left '<' '>' LE GE
%left '+' '-'
%left '*' '/' '%'
%precedence '!'
%precedence UMINUS
%precedence LOWER_THAN_ELSE
%precedence ELSE

%start program

%%

program
    : statement_list
      {
          programStatements = std::move(*$1);
          delete $1;
      }
    ;

statement_list
    : %empty
      {
          $$ = new std::vector<StmtPtr>();
      }
    | statement_list statement
      {
          $$ = $1;
          if ($2 != nullptr) {
              $$->emplace_back($2);
          }
      }
    ;

statement
    : declaration ';'
      { $$ = $1; }
    | assignment ';'
      { $$ = $1; }
    | print_statement ';'
      { $$ = $1; }
    | if_statement
      { $$ = $1; }
    | while_statement
      { $$ = $1; }
    | do_while_statement ';'
      { $$ = $1; }
    | block
      { $$ = $1; }
    | error ';'
      {
          yyerrok;
          $$ = nullptr;
      }
    ;

declaration
    : type IDENTIFIER
      {
          $$ = new DeclarationStmt($1, std::string($2), nullptr);
          free($2);
      }
    | type IDENTIFIER '=' expression
      {
          $$ = new DeclarationStmt($1, std::string($2), ExprPtr($4));
          free($2);
      }
    ;

type
    : INT    { $$ = DataType::INT; }
    | FLOAT  { $$ = DataType::FLOAT; }
    | STRING { $$ = DataType::STRING; }
    | BOOL   { $$ = DataType::BOOL; }
    ;

assignment
    : IDENTIFIER '=' expression
      {
          $$ = new AssignmentStmt(std::string($1), ExprPtr($3));
          free($1);
      }
    ;

print_statement
    : PRINT '(' expression ')'
      {
          $$ = new PrintStmt(ExprPtr($3));
      }
    ;

if_statement
    : IF '(' expression ')' statement %prec LOWER_THAN_ELSE
      {
          $$ = new IfStmt(ExprPtr($3), StmtPtr($5), nullptr);
      }
    | IF '(' expression ')' statement ELSE statement
      {
          $$ = new IfStmt(ExprPtr($3), StmtPtr($5), StmtPtr($7));
      }
    ;

while_statement
    : WHILE '(' expression ')' statement
      {
          $$ = new WhileStmt(ExprPtr($3), StmtPtr($5));
      }
    ;

do_while_statement
    : DO statement WHILE '(' expression ')'
      {
          $$ = new DoWhileStmt(StmtPtr($2), ExprPtr($5));
      }
    ;

block
    : '{' statement_list '}'
      {
          auto *node = new BlockStmt();
          node->statements = std::move(*$2);
          delete $2;
          $$ = node;
      }
    ;

expression
    : INT_LITERAL
      {
          $$ = new LiteralExpr(std::string($1), DataType::INT);
          free($1);
      }
    | FLOAT_LITERAL
      {
          $$ = new LiteralExpr(std::string($1), DataType::FLOAT);
          free($1);
      }
    | STRING_LITERAL
      {
          $$ = new LiteralExpr(std::string($1), DataType::STRING);
          free($1);
      }
    | TRUE
      { $$ = new LiteralExpr("true", DataType::BOOL); }
    | FALSE
      { $$ = new LiteralExpr("false", DataType::BOOL); }
    | IDENTIFIER
      {
          $$ = new VariableExpr(std::string($1));
          free($1);
      }
    | '(' expression ')'
      { $$ = $2; }
    | expression '+' expression
      { $$ = new BinaryExpr("+", ExprPtr($1), ExprPtr($3)); }
    | expression '-' expression
      { $$ = new BinaryExpr("-", ExprPtr($1), ExprPtr($3)); }
    | expression '*' expression
      { $$ = new BinaryExpr("*", ExprPtr($1), ExprPtr($3)); }
    | expression '/' expression
      { $$ = new BinaryExpr("/", ExprPtr($1), ExprPtr($3)); }
    | expression '%' expression
      { $$ = new BinaryExpr("%", ExprPtr($1), ExprPtr($3)); }
    | expression EQ expression
      { $$ = new BinaryExpr("==", ExprPtr($1), ExprPtr($3)); }
    | expression NE expression
      { $$ = new BinaryExpr("!=", ExprPtr($1), ExprPtr($3)); }
    | expression '<' expression
      { $$ = new BinaryExpr("<", ExprPtr($1), ExprPtr($3)); }
    | expression '>' expression
      { $$ = new BinaryExpr(">", ExprPtr($1), ExprPtr($3)); }
    | expression LE expression
      { $$ = new BinaryExpr("<=", ExprPtr($1), ExprPtr($3)); }
    | expression GE expression
      { $$ = new BinaryExpr(">=", ExprPtr($1), ExprPtr($3)); }
    | expression AND expression
      { $$ = new BinaryExpr("&&", ExprPtr($1), ExprPtr($3)); }
    | expression OR expression
      { $$ = new BinaryExpr("||", ExprPtr($1), ExprPtr($3)); }
    | '!' expression
      { $$ = new UnaryExpr("!", ExprPtr($2)); }
    | '-' expression %prec UMINUS
      { $$ = new UnaryExpr("-", ExprPtr($2)); }
    ;

%%

void yyerror(const char *message)
{
    ++syntax_errors;
    fprintf(stderr, "Syntax Error at line %d: %s\n",
            yylineno, message);
}
