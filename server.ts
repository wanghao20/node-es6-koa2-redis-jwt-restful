/**
 * 项目启动文件
 */
// tslint:disable-next-line:no-var-requires
let  App = require('./src/app').App;

const app = new App();

app.start();
