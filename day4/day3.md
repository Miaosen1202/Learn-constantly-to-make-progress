# Vue.js - Day3

## 今天主要内容
1. 组件
2. 路由

## 定义Vue组件
+ 什么是模块化：模块化是从代码的角度出发，分析项目，把项目中一些功能类似的代码，单独的抽离为一个个的模块；那么为了保证大家以相同的方式去封装模块，于是我们就创造了模块化的规范（CommonJS规范）；
 - 模块化的好处：方便项目的开发；和后期的维护与扩展；今后如果需要某些固定功能的模块，则直接拿来引用就行，提高了项目开发效率！
+ 什么是组件化：从UI的角度出发考虑问题，把页面上有重用性的UI解构和样式，单独的抽离出来，封装为单独的组件；
 - 组件化的好处：随着项目规模的发展，我们手里的组件，会越来越多，这样，我们今后一个页面中的UI，几乎都可以从手中拿现成的组件拼接出来；方便项目的开发和维护；


### 全局组件定义的三种方式
#### 第一种方式：
1. 先调用 `Vue.extend()` 得到组件的构造函数：
```
 // 创建全局组件的第一种方式：   component
    const com1 = Vue.extend({
      template: '<h1>这是创建的第一个全局组件</h1>' // template 属性，表示这个组件的 UI 代码解构
    })
```
2. 通过 `Vue.component('组件的名称', 组件的构造函数)` 来注册全局组件：
```
    // 使用 Vue.component 向全局注册一个组件
    // Vue.component('组件的名称', 组件的构造函数)
    Vue.component('mycom1', com1)
```
3. 把注册好的全局组件名称，以标签形式引入到页面中即可：
```
<!-- 如何引入一个全局的Vue组件呢？ 直接把 组件的名称，以标签的形式，放到页面上就好了！ -->
    <mycom1></mycom1>
```
#### 第二种方式：
1. 直接使用 `Vue.component('组件名称', { 组件模板对象 })`
```
const com2Obj = {
      // 1. template 属性中，不能单独放一段文本，必须用标签包裹起来；
      // 2. 如果在 template 属性中，想要放多个元素了，那么，在这些元素外，必须有唯一的一个根元素进行包裹；
      template: '<div><h2>这是直接使用 Vue.component 创建出来的组件</h2><h3>红红火火</h3></div>'
    }

    // 定义全局的组件
    // Vue.component 的第二个参数，既接收 一个 组件的构造函数， 同时，也接受 一个对象
    Vue.component('mycom2', com2Obj)
```

#### 第三种方式：
1. 先使用 `template` 标签定义一个模板的代码解构：
```
  <!-- 定义一个 template 标签元素  -->
  <!-- 使用 Vue 提供的 template 标签，可以定义组件的UI模板解构 -->
  <template id="tmpl">
    <div>
      <h3>哈哈，这是在外界定义的组件UI解构</h3>
      <h3>我是来捣乱的</h3>
    </div>
  </template>
```
2. 使用 `Vue.component` 注册组件：
```
    // 这是定义的全局组件
    Vue.component('mycom3', {
      template: '#tmpl'
    })
```

> 注意： 从更抽象的角度来说，每个组件，就相当于是一个自定义的元素；
> 注意： 组件中的DOM结构，有且只能有唯一的根元素（Root Element）来进行包裹！


### 组件中展示数据和响应事件
```
Vue.component('mycom', {
      template: '<h3 @click="show">这是自定义的全局组件：{{ msg }}</h3>',
      data: function () { // 在 组件中，可以有自己的私有数据，但是，组件的 data 必须是一个 function，并且内部 return 一个 数据对象
        return {
          msg: '哈哈哈'
        }
      },
      methods: { // 尝试定义组件的私有方法
        show() {
          console.log('出发了组件的私有show方法！')
        }
      }
    })
```


### 【重点】为什么组件中的data属性必须定义为一个方法并返回一个对象
1. 通过计数器案例演示


### 使用`components`属性定义局部子组件


## 使用`flag`标识符结合`v-if`和`v-else`切换组件


## 使用component标签的`:is`属性来切换组件,并添加动画


## 父组件向子组件传值
### 父组件向子组件传递普通数据
1. 把要传递给子组件的数据，作为 自定义属性，通过 `v-bind:` 绑定到子组件身上：
```
<com1 :msg123="parentMsg"></com1>
```
2. 在子组件中，不能直接使用父组件传递过来的数据，需要先使用`props` 数组来接收一下：
```
props: ['msg123']
```
3. 注意：在接收父组件传递过来的 `props`的时候，接收的名称，一定要和父组件传递过来的自定义属性，名称保持一致！
### 父组件向子组件传递方法

## 子组件向父组件传值


## 评论列表案例
目标：主要练习父子组件之间传值


## 使用 `this.$refs` 来获取元素和组件
```
  <div id="app">
    <div>
      <input type="button" value="获取元素内容" @click="getElement" />
      <!-- 使用 ref 获取元素 -->
      <h1 ref="myh1">这是一个大大的H1</h1>

      <hr>
      <!-- 使用 ref 获取子组件 -->
      <my-com ref="mycom"></my-com>
    </div>
  </div>

  <script>
    Vue.component('my-com', {
      template: '<h5>这是一个子组件</h5>',
      data() {
        return {
          name: '子组件'
        }
      }
    });

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {
        getElement() {
          // 通过 this.$refs 来获取元素
          console.log(this.$refs.myh1.innerText);
          // 通过 this.$refs 来获取组件
          console.log(this.$refs.mycom.name);
        }
      }
    });
  </script>
```




## 在Vue组件中data和props的区别
1. data 在组件中，要被定义成function并返回一个对象
2. props 在组件中，要被定义成数组，其中，数组的值都是字符串名，表示父组件传递过来的数据；
3. props 的数据，不要直接拿来修改，如果想要修改，必须在 data 上重新定义一个 属性，然后把属性的值 从 this.props 拿过来；

> data 上的数据，都是组件自己私有的， data 上的数据，都是可读可写的
> props 数据，都是外界传递过来的数据， props 中的数据只能读取，不能重新写入


## 什么是路由
1. 对于普通的网站，所有的超链接都是URL地址，所有的URL地址都对应服务器上对应的资源；

2. 对于单页面应用程序来说，主要通过URL中的hash(#号)来实现不同页面之间的切换，同时，hash有一个特点：HTTP请求中不会包含hash相关的内容；所以，单页面程序中的页面跳转主要用hash实现；

3. 在单页面应用程序中，这种通过hash改变来切换页面的方式，称作前端路由（区别于后端路由）；

4. 前端的路由：就是根据不同的Hash地址，在页面上展示不同的前端组件；

## 在 vue 中使用 vue-router
1. 导入 vue-router 组件类库：
```
<!-- 1. 导入 vue-router 组件类库 -->
  <script src="./lib/vue-router-2.7.0.js"></script>
```
2. 使用 router-link 组件来导航
```
<!-- 2. 使用 router-link 组件来导航 -->
<router-link to="/login">登录</router-link>
<router-link to="/register">注册</router-link>
```
3. 使用 router-view 组件来显示匹配到的组件
```
<!-- 3. 使用 router-view 组件来显示匹配到的组件 -->
<router-view></router-view>
```
4. 创建使用`Vue.extend`创建组件
```
    // 4.1 使用 Vue.extend 来创建登录组件
    var login = Vue.extend({
      template: '<h1>登录组件</h1>'
    });

    // 4.2 使用 Vue.extend 来创建注册组件
    var register = Vue.extend({
      template: '<h1>注册组件</h1>'
    });
```
5. 创建一个路由 router 实例，通过 routers 属性来定义路由匹配规则
```
// 5. 创建一个路由 router 实例，通过 routers 属性来定义路由匹配规则
    var router = new VueRouter({
      routes: [
        { path: '/login', component: login },
        { path: '/register', component: register }
      ]
    });
```
6. 使用 router 属性来使用路由规则
```
// 6. 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      router: router // 使用 router 属性来使用路由规则
    });
```

## 设置路由高亮

## 设置路由切换动效

## 在路由规则中定义参数
1. 在规则中定义参数：
```
{ path: '/register/:id', component: register }
```
2. 通过 `this.$route.params`来获取路由中的参数：
```
var register = Vue.extend({
      template: '<h1>注册组件 --- {{this.$route.params.id}}</h1>'
    });
```
2. 在路由中，使用`?`传参，不需要修改对应的路由规则；

## 使用 `children` 属性实现路由嵌套
```
  <div id="app">
    <router-link to="/account">Account</router-link>

    <router-view></router-view>
  </div>

  <script>
    // 父路由中的组件
    const account = Vue.extend({
      template: `<div>
        这是account组件
        <router-link to="/account/login">login</router-link> | 
        <router-link to="/account/register">register</router-link>
        <router-view></router-view>
      </div>`
    });

    // 子路由中的 login 组件
    const login = Vue.extend({
      template: '<div>登录组件</div>'
    });

    // 子路由中的 register 组件
    const register = Vue.extend({
      template: '<div>注册组件</div>'
    });

    // 路由实例
    var router = new VueRouter({
      routes: [
        { path: '/', redirect: '/account/login' }, // 使用 redirect 实现路由重定向
        {
          path: '/account',
          component: account,
          children: [ // 通过 children 数组属性，来实现路由的嵌套
            { path: 'login', component: login }, // 注意，子路由的开头位置，不要加 / 路径符
            { path: 'register', component: register }
          ]
        }
      ]
    });

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      components: {
        account
      },
      router: router
    });
  </script>
```

## 命名视图实现经典布局
1. 标签代码结构：
```
<div id="app">
    <router-view></router-view>
    <div class="content">
      <router-view name="a"></router-view>
      <router-view name="b"></router-view>
    </div>
  </div>
```
2. JS代码：
```
<script>
    var header = Vue.component('header', {
      template: '<div class="header">header</div>'
    });

    var sidebar = Vue.component('sidebar', {
      template: '<div class="sidebar">sidebar</div>'
    });

    var mainbox = Vue.component('mainbox', {
      template: '<div class="mainbox">mainbox</div>'
    });

    // 创建路由对象
    var router = new VueRouter({
      routes: [
        {
          path: '/', components: {
            default: header,
            a: sidebar,
            b: mainbox
          }
        }
      ]
    });

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      router
    });
  </script>
```
3. CSS 样式：
```
  <style>
    .header {
      border: 1px solid red;
    }

    .content{
      display: flex;
    }
    .sidebar {
      flex: 2;
      border: 1px solid green;
      height: 500px;
    }
    .mainbox{
      flex: 8;
      border: 1px solid blue;
      height: 500px;
    }
  </style>
```

## `watch`属性的使用
考虑一个问题：想要实现 `名` 和 `姓` 两个文本框的内容改变，则全名的文本框中的值也跟着改变；（用以前的知识如何实现？？？）

1. 监听`data`中属性的改变：
```
<div id="app">
    <input type="text" v-model="firstName"> +
    <input type="text" v-model="lastName"> =
    <span>{{fullName}}</span>
  </div>

  <script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        firstName: 'jack',
        lastName: 'chen',
        fullName: 'jack - chen'
      },
      methods: {},
      watch: {
        'firstName': function (newVal, oldVal) { // 第一个参数是新数据，第二个参数是旧数据
          this.fullName = newVal + ' - ' + this.lastName;
        },
        'lastName': function (newVal, oldVal) {
          this.fullName = this.firstName + ' - ' + newVal;
        }
      }
    });
  </script>
```
2. 监听路由对象的改变：
```
<div id="app">
    <router-link to="/login">登录</router-link>
    <router-link to="/register">注册</router-link>

    <router-view></router-view>
  </div>

  <script>
    var login = Vue.extend({
      template: '<h1>登录组件</h1>'
    });

    var register = Vue.extend({
      template: '<h1>注册组件</h1>'
    });

    var router = new VueRouter({
      routes: [
        { path: "/login", component: login },
        { path: "/register", component: register }
      ]
    });

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      router: router,
      watch: {
        '$route': function (newVal, oldVal) {
          if (newVal.path === '/login') {
            console.log('这是登录组件');
          }
        }
      }
    });
  </script>
```

## `computed`计算属性的使用
1. 默认只有`getter`的计算属性：
```
<div id="app">
    <input type="text" v-model="firstName"> +
    <input type="text" v-model="lastName"> =
    <span>{{ fullName }}</span>
  </div>

  <script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        firstName: 'jack',
        lastName: 'chen'
      },
      methods: {},
      computed: { // 计算属性； 特点：当计算属性中所以来的任何一个 data 属性改变之后，都会重新触发 本计算属性 的重新计算，从而更新 fullName 的值
        fullName() {
          return this.firstName + ' - ' + this.lastName;
        }
      }
    });
  </script>
```
2. 定义有`getter`和`setter`的计算属性：
```
<div id="app">
    <input type="text" v-model="firstName">
    <input type="text" v-model="lastName">
    <!-- 点击按钮重新为 计算属性 fullName 赋值 -->
    <input type="button" value="修改fullName" @click="changeName">

    <span>{{fullName}}</span>
  </div>

  <script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        firstName: 'jack',
        lastName: 'chen'
      },
      methods: {
        changeName() {
          this.fullName = 'TOM - chen2';
        }
      },
      computed: {
        fullName: {
          get: function () {
            return this.firstName + ' - ' + this.lastName;
          },
          set: function (newVal) {
            var parts = newVal.split(' - ');
            this.firstName = parts[0];
            this.lastName = parts[1];
          }
        }
      }
    });
  </script>
```

## `watch`、`computed`和`methods`之间的对比
1. `computed`属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
2. `methods`方法表示一个具体的操作，主要书写业务逻辑；
3. `watch`一个对象，键是需要观察的表达式，值是对应回调函数。主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作；可以看作是`computed`和`methods`的结合体；

## `nrm`的安装使用
作用：提供了一些最常用的NPM包镜像地址，能够让我们快速的切换安装包时候的服务器地址；
什么是镜像：原来包刚一开始是只存在于国外的NPM服务器，但是由于网络原因，经常访问不到，这时候，我们可以在国内，创建一个和官网完全一样的NPM服务器，只不过，数据都是从人家那里拿过来的，除此之外，使用方式完全一样；
1. 运行`npm i nrm -g`全局安装`nrm`包；
2. 使用`nrm ls`查看当前所有可用的镜像源地址以及当前所使用的镜像源地址；
3. 使用`nrm use npm`或`nrm use taobao`切换不同的镜像源地址；

## 使用`cnpm`工具下载和安装包
1. 大家要区分 `cnpm` 这个工具 和  nrm 中 `cnpm` 的区别；
 + 在 `nrm` 中，cnpm 只是一个镜像的地址而已；
 + 在`cnpm` 这个工具中，它是一个具体的工具，能够像`npm`一样，去下载和安装包！
2. 运行`npm i cnpm -g` 全局按照 `cnpm` 这个下载包工具
3. 可以像使用`npm`装包一样，去使用`cnpm`装包；
 + `npm i jquery -S`
 + `cnpm i jquery -S`

## 相关文件
1. [URL中的hash（井号）](http://www.cnblogs.com/joyho/articles/4430148.html)