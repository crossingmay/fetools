# work at ABM

Anyway, fighting~ （别bb，干！
pease -V-
:)

### Task 1: 专题页工具

[初次使用graphql](./graphql.md)

根据我们历史遗留项目，粗略了解了下了seajs的模块管理和加载，Laravel的blade模板，artTemplate的语法

### Task 2: 性能优化

[性能优化相关](./performance.md)

[懒加载](../demo/lazyloadNew.html)

* android 5 compatible Tips

  vivo 等一些旧机型，安卓5.1以下不支持es6的语法，所以需要特别注意。meta里的minimal-ui 仅ios7有用，ios8就移除了，安卓不支持。

### 关于lodash

lodash在我们的项目里常用的方法：

_.cloneDeep(aimObj)：深拷贝方法
_.isEqual(obj1, obj2)：对象比较方法
_.padStart(aimString<string>, finalLength<number>, paddingString<string>): 填充方法

——其他，用到的时候再补充