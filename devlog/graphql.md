向服务端发送一次描述信息，告知客户端所需的所有数据，数据的控制甚至可以精细到字段，达到一次请求获取所有所需数据的目的。


### GraphQL 请求体
```
query myQry ($name: String!) {
  movie(name: "Manchester") {
    name
    desc
    ratings
  }
}
```
**操作类型**

* query，可以理解为get的请求
* mutation，可以理解为post、put、delete之类的请求

**操作名称**

操作名称是个可选的参数，操作名称对整个请求并不产生影响，只是赋予请求体一个名字，可以作为调试的依据。

**变量定义**

在 GraphQL 中，声明一个变量使用$符号开头，冒号后面紧跟着变量的传入类型。如果要使用变量，直接引用即可，例如上面的 movie 就可以改写成 movie(name: $name)。

**选择集**

把我们所需要的字段合在一起，我们把它称之为某某的选择集。上面的 name、desc、ratings 合在一起则称之为 movie 的选择集，同理，movie 是 myQry 的选择集。需要注意的是，在标量上使用不能使用选择集这种操作，因为它已经是最后一层了。

**字段**

一个数据单元

标量字段是粒度最细的一个数据单元了，同时作为返回 JSON 响应数据中的最后一个字段

GraphQL 默认提供的标量类型有：Int、Float、String、Boolean、ID，也可以实现自定义的标量类型，如：Date。标量类型有什么用呢？返回数据的字段必须是标量类型。



### Types

定义了 GraphQL 服务支持的类型

后面紧跟着的感叹号声明了此类型是个不可空类型

### 开发工具

GraphiQL/ChromeiQL

### 示例

增

```
mutation addSubject {
  subjectManage {
    addSubject(params: {
          pageTitle: "helo",
          backEndTitle: "hello",
          shareFlag: 0,
          shareDesc: "",
          shareTitle: "",
          shareImg: 0,
          tagId: 1,
          pageStyle: "1"
    	}
    ) {
      code,
      msg
    }
  }
}
```

删
```

mutation {
      subjectManage {
        deleteSubject(id: $id) {
          code
          msg
        }
      }
    }
```

改

```
mutation updateSubject {
      subjectManage {
        editSubject(id: $id, params: $params) {
          code
          msg
        }
      }
    }
```

查

```
// query 关键字可省
query getSubjectById {
  subjectManage {
    subjectList(filter: {id: 1}) {
      list {
        id
        pageStyle
      }
    }
  }
}
```


### 优缺点
**优点**
* 优点所见即所得：所写请求体即为最终数据结构
* 减少网络请求：复杂数据的获取也可以一次请求完成
* Schema 即文档：定义的 Schema 也规定了请求的规则
* 类型检查：严格的类型检查能够消除一定的人为失误

**缺点**
* 增加了服务端实现的复杂度：一些业务可能无法迁移使用 GraphQL，虽然可以使用中间件的方式将原业务的请求进行代理，这无疑也将增加复杂度和资源的消耗

> GraphQL 的引入能够解耦前后端的开发，在提高开发效率的同时也提供了强大友好的调试界面。
> 但是，并不是所有的场景都适合使用 GraphQL：
> 在已有项目中引入 GraphQL 时，我们需要考虑迁移成本；
> 在整个项目复杂度低，业务场景简单的情况下，没有引入 GraphQL 的必要；
> 在开发过程中，开发者需要根据实际需求，综合考虑是否需要将其引入


### REF

[GraphQL 使用介绍](https://aotu.io/notes/2017/12/15/graphql-use/index.html)

[GraphQL 基础实践](https://juejin.im/post/5b5545a0e51d4518e3119933#heading-18)

[Introduction to GraphQL](https://graphql.org/learn/)

[使用 GraphQL 定制数据结构](https://www.ibm.com/developerworks/cn/web/wa-using-graphgl-to-customize-data-structure/index.html)

[Apollo React 中文文档](https://apollographqlcn.github.io/react-docs-cn/api-queries.html)

[GraphQL + React Apollo 大型前后端分离项目实战之后端](https://zhuanlan.zhihu.com/p/85908758?utm_source=wechat_session&utm_medium=social&utm_oi=55640844140544)

