## Lab2 外部子程序调用

### 2.1 外部子程序概念

* 一个程序还可以调用其他包含任何子程序以及其他单独编译的程序在外层的程序。但主程序看不到单独编译的程序中各个子程序名。

* 如下例：PROG-C是个单独编译的程序，带子程序PROG-D。主程序PROG-A可以调用内部子程序PROG-B和外部子程序PROG-C。PROG-A不可以调用PROG-D。

  <img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1gg7opvwt7jj30cs046q35.jpg" alt="image-20200628081208817" style="zoom:33%;" />

### 2.2 外部子程序调用

有两种调用方式：

* BY CONTENT从句表示调用程序中identifier参数的内容复制到被调用程序的连接节。被调用程序实际上拥有数据的局部拷贝。它可以修改这个数据，但修改的只是数据的局部拷贝，被调用程序中identifier参数的内容不变。
* BY REFERENCE表示被调用程序实际引用调用程序中的identifie参数，而不是它的拷贝。子程序中对数据的任何改变都发生在调用程序的数据中。默认是BY REFENCE方式。


<img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1gg7osfkfopj30k40ckdhl.jpg" alt="image-20200628081434857" style="zoom:50%;" />

### 2.3 外部子程序实验

将上面的内部子程序改写成外部子程序。

调用程序

```cobol
IDENTIFICATION DIVISION.
PROGRAM-ID. MAIN.

DATA DIVISION.
   WORKING-STORAGE SECTION.
   01 WS-STUDENT-ID PIC 9(4) VALUE 1000.
   01 WS-STUDENT-NAME PIC A(15) VALUE 'Tim'.

PROCEDURE DIVISION.
   CALL 'UTIL' USING BY CONTENT WS-STUDENT-ID, BY CONTENT WS-STUDENT-NAME.
   DISPLAY 'Student Id : ' WS-STUDENT-ID
   DISPLAY 'Student Name : ' WS-STUDENT-NAME
STOP RUN.
```

被调用程序

```cobol
IDENTIFICATION DIVISION.
PROGRAM-ID. UTIL.

DATA DIVISION.
   LINKAGE SECTION.
   01 LS-STUDENT-ID PIC 9(4).
   01 LS-STUDENT-NAME PIC A(15).

PROCEDURE DIVISION USING LS-STUDENT-ID, LS-STUDENT-NAME.
   DISPLAY 'In Called Program'.
   MOVE 1111 TO LS-STUDENT-ID.
EXIT PROGRAM.
```

用JCL执行上述COBOL程序

```cobol
//SAMPLE JOB(TESTJCL,XXXXXX),CLASS=A,MSGCLASS=C
//STEP1 EXEC PGM=MAIN
```

当编译和执行上面的程序，将产生以下结果：

```cobol
In Called Program
Student Id : 1000
Student Name : Tim
```

