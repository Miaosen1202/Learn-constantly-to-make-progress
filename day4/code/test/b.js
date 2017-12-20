// 导入模块a中向外暴露的成员
import m1 from './a.js'
console.log(m1)

// webpack 在打包指定入口文件的时候，会把  这个文件中，所有依赖的 第三方包 或 JS 文件，也当作模块，一起打包到 bundle.js 中，这样， 被打包的 入口文件，就能正常执行了