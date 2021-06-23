/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：main.js
*   创 建 者：ZY
*   创建日期：2021年06月15日
*   描    述：
*
================================================================*/
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const UseRouter = require('../router');
const errorHandle = require('./error.handle');

app.use(bodyParser());
UseRouter(app);
app.on('error', errorHandle);

module.exports = app;
