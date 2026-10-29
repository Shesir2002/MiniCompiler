
#ifndef AST_HPP
#define AST_HPP

#include <string>
#include <vector>
#include <memory>

enum class DataType {
    INT,
    FLOAT,
    STRING,
    BOOL,
    UNKNOWN
};

inline std::string dataTypeToString(DataType type) {
    switch (type) {
        case DataType::INT: return "int";
        case DataType::FLOAT: return "float";
        case DataType::STRING: return "string";
        case DataType::BOOL: return "bool";
        default: return "unknown";
    }
}

struct ASTNode {
    virtual ~ASTNode() = default;
};

struct Expression : ASTNode {
    virtual ~Expression() = default;
};

struct Statement : ASTNode {
    virtual ~Statement() = default;
};

using ExprPtr = std::unique_ptr<Expression>;
using StmtPtr = std::unique_ptr<Statement>;

struct LiteralExpr : Expression {
    std::string value;
    DataType type;

    LiteralExpr(const std::string& value, DataType type)
        : value(value), type(type) {}
};

struct VariableExpr : Expression {
    std::string name;

    explicit VariableExpr(const std::string& name)
        : name(name) {}
};

struct BinaryExpr : Expression {
    std::string op;
    ExprPtr left;
    ExprPtr right;

    BinaryExpr(std::string op, ExprPtr left, ExprPtr right)
        : op(std::move(op)),
          left(std::move(left)),
          right(std::move(right)) {}
};

struct UnaryExpr : Expression {
    std::string op;
    ExprPtr operand;

    UnaryExpr(std::string op, ExprPtr operand)
        : op(std::move(op)),
          operand(std::move(operand)) {}
};

struct DeclarationStmt : Statement {
    DataType type;
    std::string name;
    ExprPtr initializer;

    DeclarationStmt(DataType type, std::string name, ExprPtr initializer = nullptr)
        : type(type),
          name(std::move(name)),
          initializer(std::move(initializer)) {}
};

struct AssignmentStmt : Statement {
    std::string name;
    ExprPtr value;

    AssignmentStmt(std::string name, ExprPtr value)
        : name(std::move(name)),
          value(std::move(value)) {}
};

struct PrintStmt : Statement {
    ExprPtr expression;

    explicit PrintStmt(ExprPtr expression)
        : expression(std::move(expression)) {}
};

struct BlockStmt : Statement {
    std::vector<StmtPtr> statements;
};

struct IfStmt : Statement {
    ExprPtr condition;
    StmtPtr thenBranch;
    StmtPtr elseBranch;

    IfStmt(ExprPtr condition, StmtPtr thenBranch, StmtPtr elseBranch = nullptr)
        : condition(std::move(condition)),
          thenBranch(std::move(thenBranch)),
          elseBranch(std::move(elseBranch)) {}
};

struct WhileStmt : Statement {
    ExprPtr condition;
    StmtPtr body;

    WhileStmt(ExprPtr condition, StmtPtr body)
        : condition(std::move(condition)),
          body(std::move(body)) {}
};

struct DoWhileStmt : Statement {
    StmtPtr body;
    ExprPtr condition;

    DoWhileStmt(StmtPtr body, ExprPtr condition)
        : body(std::move(body)),
          condition(std::move(condition)) {}
};

#endif
