// 项目JS的入口文件
// 问题：浏览器中，在一个JS文件中，能否导入另外的一个JS脚本文件？？？ 默认是不行的

// 为了解决 浏览器中天生没有模块化的问题， ES6 中 提出了  import  和  export 的概念;

// 注意： ES6中 使用 import 导入其它JS模块的语法，chrome 浏览器尚未支持；
import $ from 'jquery'
// const $ = require('jquery')

// 这是Jquery的入口函数
$(function () {
  $('li:odd').css('backgroundColor', 'lightblue')
  $('li:even').css('backgroundColor', function () {
    return 'pink'
  })
})


// 1. 使用全局的webpack 来构建列表隔行变色案例：
//     运行 `webpack  .\src\main.js   .\dist\bundle.js`  其中，第一个路径是要处理的文件    第二个路径是 处理完毕后， 要输出的文件，   在网页中，只能使用处理好的文件



//    node    ->    nodemon 
//  webpack  ->    webpack-dev-server

// 使用 webpack-dev-server 这个工具，能够提供类似于 nodemon 的功能，实时监听项目改变，并自定编译项目代码
// webpack-dev-server 这个工具，要求你在项目本地要安装了 webpack;

// 注意： 使用 webpack-dev-server 这个工具，自动打包的 bundle.js 文件，并没有存放到实际的物理磁盘； 但是，这个 bundle.js 文件，被托管到了 内存中，大家可以认为： 在项目的根目录中，有一个  虚拟的、看不见的 bundle.js

