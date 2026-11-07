
// #ifndef AST_HPP
// #define AST_HPP

// #include <string>
// #include <vector>
// #include <memory>

// enum class DataType {
//     INT,
//     FLOAT,
//     STRING,
//     DOUBLE,
//     BOOL,
//     UNKNOWN
// };

// inline std::string dataTypeToString(DataType type) {
//     switch (type) {
//         case DataType::INT: return "int";
//         case DataType::FLOAT: return "float";
//         case DataType::STRING: return "string";
//         case DataType::DOUBLE: return "double";
//         case DataType::BOOL: return "bool";
//         default: return "unknown";
//     }
// }

// struct ASTNode {
//     virtual ~ASTNode() = default;
// };

// struct Expression : ASTNode {
//     virtual ~Expression() = default;
// };

// struct Statement : ASTNode {
//     virtual ~Statement() = default;
// };

// using ExprPtr = std::unique_ptr<Expression>;
// using StmtPtr = std::unique_ptr<Statement>;

// struct LiteralExpr : Expression {
//     std::string value;
//     DataType type;

//     LiteralExpr(const std::string& value, DataType type)
//         : value(value), type(type) {}
// };

// struct VariableExpr : Expression {
//     std::string name;

//     explicit VariableExpr(const std::string& name)
//         : name(name) {}
// };

// struct BinaryExpr : Expression {
//     std::string op;
//     ExprPtr left;
//     ExprPtr right;

//     BinaryExpr(std::string op, ExprPtr left, ExprPtr right)
//         : op(std::move(op)),
//           left(std::move(left)),
//           right(std::move(right)) {}
// };

// struct UnaryExpr : Expression {
//     std::string op;
//     ExprPtr operand;

//     UnaryExpr(std::string op, ExprPtr operand)
//         : op(std::move(op)),
//           operand(std::move(operand)) {}
// };

// struct DeclarationStmt : Statement {
//     DataType type;
//     std::string name;
//     ExprPtr initializer;

//     DeclarationStmt(DataType type, std::string name, ExprPtr initializer = nullptr)
//         : type(type),
//           name(std::move(name)),
//           initializer(std::move(initializer)) {}
// };

// struct AssignmentStmt : Statement {
//     std::string name;
//     ExprPtr value;

//     AssignmentStmt(std::string name, ExprPtr value)
//         : name(std::move(name)),
//           value(std::move(value)) {}
// };

// struct PrintStmt : Statement {
//     ExprPtr expression;

//     explicit PrintStmt(ExprPtr expression)
//         : expression(std::move(expression)) {}
// };

// struct BlockStmt : Statement {
//     std::vector<StmtPtr> statements;
// };

// struct IfStmt : Statement {
//     ExprPtr condition;
//     StmtPtr thenBranch;
//     StmtPtr elseBranch;

//     IfStmt(ExprPtr condition, StmtPtr thenBranch, StmtPtr elseBranch = nullptr)
//         : condition(std::move(condition)),
//           thenBranch(std::move(thenBranch)),
//           elseBranch(std::move(elseBranch)) {}
// };

// struct WhileStmt : Statement {
//     ExprPtr condition;
//     StmtPtr body;

//     WhileStmt(ExprPtr condition, StmtPtr body)
//         : condition(std::move(condition)),
//           body(std::move(body)) {}
// };

// struct DoWhileStmt : Statement {
//     StmtPtr body;
//     ExprPtr condition;

//     DoWhileStmt(StmtPtr body, ExprPtr condition)
//         : body(std::move(body)),
//           condition(std::move(condition)) {}
// };

// #endif



#ifndef AST_HPP
#define AST_HPP

#include <string>
#include <vector>
#include <memory>
//changed
#include <unordered_map>
#include <iostream>
#include <stdexcept>

enum class DataType {
    INT,
    FLOAT,
    STRING,
    DOUBLE,
    BOOL,
    UNKNOWN
};

inline std::string dataTypeToString(DataType type) {
    switch (type) {
        case DataType::INT: return "int";
        case DataType::FLOAT: return "float";
        case DataType::STRING: return "string";
        case DataType::DOUBLE: return "double";
        case DataType::BOOL: return "bool";
        default: return "unknown";
    }
}

//changed
inline std::unordered_map<std::string, int>& getSymbolTable() {
    static std::unordered_map<std::string, int> symbolTable;
    return symbolTable;
}

struct ASTNode {
    virtual ~ASTNode() = default;
};

struct Expression : ASTNode {
    virtual ~Expression() = default;
    virtual int evaluate() =0; //changed
};

struct Statement : ASTNode {
    virtual ~Statement() = default;
    virtual void execute() = 0; //changed
};

using ExprPtr = std::unique_ptr<Expression>;
using StmtPtr = std::unique_ptr<Statement>;

struct LiteralExpr : Expression {
    std::string value;
    DataType type;

    LiteralExpr(const std::string& value, DataType type)
        : value(value), type(type) {}

        int evaluate() override {
        return std::stoi(value); // Converts string literal to integer
    }
};

struct VariableExpr : Expression {
    std::string name;

    explicit VariableExpr(const std::string& name)
        : name(name) {}

        int evaluate() override {
        auto& symTable = getSymbolTable();
        if (symTable.find(name) != symTable.end()) {
            return symTable[name];
        }
        std::cerr << "Runtime Error: Undefined variable '" << name << "'\n";
        return 0;
    }
};

struct BinaryExpr : Expression {
    std::string op;
    ExprPtr left;
    ExprPtr right;

    BinaryExpr(std::string op, ExprPtr left, ExprPtr right)
        : op(std::move(op)),
          left(std::move(left)),
          right(std::move(right)) {}

          int evaluate() override {
        int lVal = left ? left->evaluate() : 0;
        int rVal = right ? right->evaluate() : 0;

        if (op == "+") return lVal + rVal;
        if (op == "-") return lVal - rVal;
        if (op == "*") return lVal * rVal;
        if (op == "/") {
            if (rVal == 0) {
                std::cerr << "Runtime Error: Division by zero\n";
                return 0;
            }
            return lVal / rVal;
        }
        return 0;
    }
};

struct UnaryExpr : Expression {
    std::string op;
    ExprPtr operand;

    UnaryExpr(std::string op, ExprPtr operand)
        : op(std::move(op)),
          operand(std::move(operand)) {}

          int evaluate() override {
        int val = operand ? operand->evaluate() : 0;
        if (op == "-") return -val;
        return val;
    }
};

struct DeclarationStmt : Statement {
    DataType type;
    std::string name;
    ExprPtr initializer;

    DeclarationStmt(DataType type, std::string name, ExprPtr initializer = nullptr)
        : type(type),
          name(std::move(name)),
          initializer(std::move(initializer)) {}

          void execute() override {
        int val = 0;
        if (initializer) {
            val = initializer->evaluate();
        }
        getSymbolTable()[name] = val; // Store variable value
    }
};

struct AssignmentStmt : Statement {
    std::string name;
    ExprPtr value;

    AssignmentStmt(std::string name, ExprPtr value)
        : name(std::move(name)),
          value(std::move(value)) {}


          void execute() override {
        int val = value ? value->evaluate() : 0;
        getSymbolTable()[name] = val; // Update variable value
    }
};

struct PrintStmt : Statement {
    ExprPtr expression;

    explicit PrintStmt(ExprPtr expression)
        : expression(std::move(expression)) {}


        void execute() override {
        if (expression) {
            int val = expression->evaluate();
            std::cout << val << "\n"; // Prints the calculated result to stdout!
        }
    }
};

struct BlockStmt : Statement {
    std::vector<StmtPtr> statements;

    void execute() override {
        for (const auto& stmt : statements) {
            if (stmt) stmt->execute();
        }
    }
};

struct IfStmt : Statement {
    ExprPtr condition;
    StmtPtr thenBranch;
    StmtPtr elseBranch;

    IfStmt(ExprPtr condition, StmtPtr thenBranch, StmtPtr elseBranch = nullptr)
        : condition(std::move(condition)),
          thenBranch(std::move(thenBranch)),
          elseBranch(std::move(elseBranch)) {}


          void execute() override {
        if (condition && condition->evaluate() != 0) {
            if (thenBranch) thenBranch->execute();
        } else if (elseBranch) {
            elseBranch->execute();
        }
    }
};

struct WhileStmt : Statement {
    ExprPtr condition;
    StmtPtr body;

    WhileStmt(ExprPtr condition, StmtPtr body)
        : condition(std::move(condition)),
          body(std::move(body)) {}


          void execute() override {
        while (condition && condition->evaluate() != 0) {
            if (body) body->execute();
        }
    }
};

struct DoWhileStmt : Statement {
    StmtPtr body;
    ExprPtr condition;

    DoWhileStmt(StmtPtr body, ExprPtr condition)
        : body(std::move(body)),
          condition(std::move(condition)) {}


          void execute() override {
        do {
            if (body) body->execute();
        } while (condition && condition->evaluate() != 0);
    }
};

#endif