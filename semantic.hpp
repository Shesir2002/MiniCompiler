
#ifndef SEMANTIC_HPP
#define SEMANTIC_HPP

#include "ast.hpp"

#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>
#include <utility>

class SemanticAnalyzer {
private:
    struct Symbol {
        DataType type;
    };

    std::vector<std::unordered_map<std::string, Symbol>> scopes;
    int errors = 0;

    void report(const std::string& message) {
        std::cerr << "Semantic Error: " << message << '\n';
        ++errors;
    }

    void enterScope() {
        scopes.emplace_back();
    }

    void exitScope() {
        if (!scopes.empty()) {
            scopes.pop_back();
        }
    }

    Symbol* lookup(const std::string& name) {
        for (auto it = scopes.rbegin(); it != scopes.rend(); ++it) {
            auto found = it->find(name);

            if (found != it->end()) {
                return &found->second;
            }
        }

        return nullptr;
    }

    bool isNumeric(DataType type) const {
        return type == DataType::INT || type == DataType::FLOAT;
    }

    DataType promoteNumeric(DataType left, DataType right) const {
        if (!isNumeric(left) || !isNumeric(right)) {
            return DataType::UNKNOWN;
        }

        if (left == DataType::FLOAT || right == DataType::FLOAT) {
            return DataType::FLOAT;
        }

        return DataType::INT;
    }

    bool canAssign(DataType target, DataType source) const {
        if (target == DataType::UNKNOWN ||
            source == DataType::UNKNOWN) {
            return true;
        }

        if (target == source) {
            return true;
        }

        // Allow automatic conversion from int to float.
        return target == DataType::FLOAT &&
               source == DataType::INT;
    }

    DataType checkExpression(const Expression* expr) {
        if (expr == nullptr) {
            return DataType::UNKNOWN;
        }

        if (auto literal = dynamic_cast<const LiteralExpr*>(expr)) {
            return literal->type;
        }

        if (auto variable = dynamic_cast<const VariableExpr*>(expr)) {
            Symbol* symbol = lookup(variable->name);

            if (symbol == nullptr) {
                report("Variable '" + variable->name +
                       "' used before declaration.");
                return DataType::UNKNOWN;
            }

            return symbol->type;
        }

        if (auto unary = dynamic_cast<const UnaryExpr*>(expr)) {
            DataType operand = checkExpression(unary->operand.get());

            if (unary->op == "!") {
                if (operand != DataType::BOOL &&
                    operand != DataType::UNKNOWN) {
                    report("Operator '!' requires a bool operand.");
                    return DataType::UNKNOWN;
                }

                return DataType::BOOL;
            }

            if (unary->op == "-") {
                if (!isNumeric(operand) &&
                    operand != DataType::UNKNOWN) {
                    report("Unary '-' requires a numeric operand.");
                    return DataType::UNKNOWN;
                }

                return operand;
            }

            report("Unknown unary operator '" + unary->op + "'.");
            return DataType::UNKNOWN;
        }

        if (auto binary = dynamic_cast<const BinaryExpr*>(expr)) {
            DataType left = checkExpression(binary->left.get());
            DataType right = checkExpression(binary->right.get());
            const std::string& op = binary->op;

            if (op == "+" && left == DataType::STRING &&
                right == DataType::STRING) {
                return DataType::STRING;
            }

            if (op == "+" || op == "-" ||
                op == "*" || op == "/" || op == "%") {
                if (op == "%" &&
                    left != DataType::INT &&
                    left != DataType::UNKNOWN) {
                    report("Operator '%' requires integer operands.");
                    return DataType::UNKNOWN;
                }

                if (op == "%" &&
                    right != DataType::INT &&
                    right != DataType::UNKNOWN) {
                    report("Operator '%' requires integer operands.");
                    return DataType::UNKNOWN;
                }

                DataType result = promoteNumeric(left, right);

                if (result == DataType::UNKNOWN &&
                    left != DataType::UNKNOWN &&
                    right != DataType::UNKNOWN) {
                    report("Operator '" + op +
                           "' requires compatible numeric operands.");
                }

                return result;
            }

            if (op == "<" || op == ">" ||
                op == "<=" || op == ">=") {
                if (promoteNumeric(left, right) == DataType::UNKNOWN &&
                    left != DataType::UNKNOWN &&
                    right != DataType::UNKNOWN) {
                    report("Comparison '" + op +
                           "' requires numeric operands.");
                    return DataType::UNKNOWN;
                }

                return DataType::BOOL;
            }

            if (op == "==" || op == "!=") {
                bool compatible =
                    (left == right) ||
                    (isNumeric(left) && isNumeric(right)) ||
                    left == DataType::UNKNOWN ||
                    right == DataType::UNKNOWN;

                if (!compatible) {
                    report("Incompatible types in comparison '" +
                           op + "'.");
                    return DataType::UNKNOWN;
                }

                return DataType::BOOL;
            }

            if (op == "&&" || op == "||") {
                if ((left != DataType::BOOL &&
                     left != DataType::UNKNOWN) ||
                    (right != DataType::BOOL &&
                     right != DataType::UNKNOWN)) {
                    report("Logical operator '" + op +
                           "' requires bool operands.");
                    return DataType::UNKNOWN;
                }

                return DataType::BOOL;
            }

            report("Unknown binary operator '" + op + "'.");
            return DataType::UNKNOWN;
        }

        report("Unsupported expression node.");
        return DataType::UNKNOWN;
    }

    void checkStatement(const Statement* stmt) {
        if (stmt == nullptr) {
            return;
        }

        if (auto declaration =
                dynamic_cast<const DeclarationStmt*>(stmt)) {
            if (scopes.empty()) {
                enterScope();
            }

            auto& current = scopes.back();

            if (current.find(declaration->name) != current.end()) {
                report("Duplicate declaration of variable '" +
                       declaration->name + "'.");
                return;
            }

            if (declaration->initializer) {
                DataType valueType =
                    checkExpression(declaration->initializer.get());

                if (!canAssign(declaration->type, valueType)) {
                    report("Cannot initialize '" + declaration->name +
                           "' of type " +
                           dataTypeToString(declaration->type) +
                           " with type " + dataTypeToString(valueType) +
                           ".");
                }
            }

            current.emplace(
                declaration->name,
                Symbol{declaration->type}
            );

            return;
        }

        if (auto assignment =
                dynamic_cast<const AssignmentStmt*>(stmt)) {
            Symbol* symbol = lookup(assignment->name);

            DataType valueType =
                checkExpression(assignment->value.get());

            if (symbol == nullptr) {
                report("Assignment to undeclared variable '" +
                       assignment->name + "'.");
            } else if (!canAssign(symbol->type, valueType)) {
                report("Cannot assign type " +
                       dataTypeToString(valueType) +
                       " to variable '" + assignment->name +
                       "' of type " +
                       dataTypeToString(symbol->type) + ".");
            }

            return;
        }

        if (auto printStmt = dynamic_cast<const PrintStmt*>(stmt)) {
            checkExpression(printStmt->expression.get());
            return;
        }

        if (auto block = dynamic_cast<const BlockStmt*>(stmt)) {
            enterScope();

            for (const auto& child : block->statements) {
                checkStatement(child.get());
            }

            exitScope();
            return;
        }

        if (auto ifStmt = dynamic_cast<const IfStmt*>(stmt)) {
            DataType condition =
                checkExpression(ifStmt->condition.get());

            if (condition != DataType::BOOL &&
                condition != DataType::UNKNOWN) {
                report("if condition must have type bool.");
            }

            checkStatement(ifStmt->thenBranch.get());
            checkStatement(ifStmt->elseBranch.get());
            return;
        }

        if (auto whileStmt = dynamic_cast<const WhileStmt*>(stmt)) {
            DataType condition =
                checkExpression(whileStmt->condition.get());

            if (condition != DataType::BOOL &&
                condition != DataType::UNKNOWN) {
                report("while condition must have type bool.");
            }

            checkStatement(whileStmt->body.get());
            return;
        }

        if (auto doStmt = dynamic_cast<const DoWhileStmt*>(stmt)) {
            checkStatement(doStmt->body.get());

            DataType condition =
                checkExpression(doStmt->condition.get());

            if (condition != DataType::BOOL &&
                condition != DataType::UNKNOWN) {
                report("do-while condition must have type bool.");
            }

            return;
        }

        report("Unsupported statement node.");
    }

public:
    SemanticAnalyzer() {
        enterScope();
    }

    int analyze(const std::vector<StmtPtr>& statements) {
        errors = 0;

        for (const auto& stmt : statements) {
            checkStatement(stmt.get());
        }

        if (errors == 0) {
            std::cout << "Semantic analysis successful!\n";
        } else {
            std::cout << "Semantic analysis failed with "
                      << errors << " error(s).\n";
        }

        return errors;
    }

    int errorCount() const {
        return errors;
    }
};

#endif
