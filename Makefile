# Detect OS automatically for local builds
ifeq ($(OS),Windows_NT)
    TARGET = mini_compiler.exe
    RM = del /Q
else
    TARGET = mini_compiler
    RM = rm -f
endif

all: $(TARGET)

$(TARGET): lex.yy.c parser.tab.c main.cpp
	g++ lex.yy.c parser.tab.c main.cpp -o $(TARGET)

lex.yy.c: lexer.l
	flex lexer.l

parser.tab.c parser.tab.h: parser.y
	bison -d parser.y

clean:
	$(RM) lex.yy.c parser.tab.c parser.tab.h $(TARGET) temp_input.txt