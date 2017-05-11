## 修改日志
### 2016-04-20
- 修改分页显示模板样式

### 2016-04-26
- ng-table.js 911行增加对只有一页时的特殊处理，以便当只有一页时也显示出页码

### 2016-04-27
- ng-table.js 911行 空数据时也显示页码
- ng-table.js 1346行 取消缺省的分页数量选择 [10, 25, 50, 100]

### 2016-04-29
- 更新ng-table.js 2331 行 增加 ng-style="{\'background-color\':(page.current ? \'#0076de\':\'\')}"

### 2016-05-11
- 去除post请求时对参数进行编码

### 2016-05-18
- 更改翻页上一下和下一页不可点击时的颜色为 #cccccc

### 2016-06-27
- 将表头标题和过滤行样式分开，分别命名为`ngTableHead`和`ngTableFilter`
    - 需要自定义表头部分样式时，只需进行重定义即可。如：
    ```
        .myTable .ngTableHead{
                background-color:#f3f3f3;
        }

        .myTable .ngTableFilter{
                background-color: #4bca81;
        }
        表格上增加：
        <table ng-table="tableParams" class="table table-bordered table-hover myTable"></table>
    ```

### 2016-07-01
- 修改.ng-table th.sortable .sort-indicator样式，padding-right 18px改为1px，尽量保证列宽有限时不出现文字换行错位