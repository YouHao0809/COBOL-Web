## Lab1 内部子程序调用

### 1.1 内部子程序概念

* 一个主程序中可以放多个子程序，每个子程序从标识部开始，到相应的END PROGRAM结束。

* 一个子程序里可以放另一个子程序。

* 内部子程序放在主程序过程部末尾，在程序结束标题之前。主程序和子程序均需要包括程序结束标题，结构如下所示：

  <img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1gg7oftknkaj30c404s0tc.jpg" alt="image-20200628080227980" style="zoom:50%;" />

### 1.2 内部子程序调用：

* 程序编译单元时，子程序通常只能由直接包含它的程序调

  用，相邻的子程序不能相互调用。如：PROG-A可以调用PROG-B

  和PROG-C，PROG-B不可以调用PROG-C。

  <img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1gg7onmt9ckj307m086dg3.jpg" alt="image-20200628080958665" style="zoom:33%;" />

* 但如果在PROGRAM-ID中将程序声明为COMMON，此子程序可以被相邻的子程PROG-B序调用。即：

  ```cobol
  PROGRAM-ID name IS
  PROG-C
  COMMON PROGRAM.
  ```

* 只有程序中包含的程序才可以声明为COMMON（公用程序）。

* 公用程序不仅可以由所在的程序调用，而且可以由所在程序包含或间接包含的其他程序调用。

* 公用程序的子程序不可以为外部程序调用。

### 1.3 内部子程序实验

完成下列内部子程序：

```cobol
IDENTIFICATION DIVISION.
PROGRAM-ID MAIN
01 TableItem IS GLOBAL
PROCEDURE DIVISION
      ???
      CALL PGM-B USING BY CONTENT DataItem
      ???
      STOP RUN
IDENTIFICATION DIVISION.
PROGRAM-ID PGM-B
      ???
END PROGRAM PGM-B
END PROGRASM ReportFromTable
```

