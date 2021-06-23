/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：auth.router.js
*   创 建 者：ZY
*   创建日期：2021年06月17日
*   描    述：
*
================================================================*/

const Router = require('koa-router');
// 登录验证
const {
	verifyUser,
	verifyAuth
} = require('../middlewave/auth.middlewave');

const {
	login,
	success
} = require('../controller/auth.controller');

const authRouter = new Router();
// 创建登录接口
authRouter.post('/login', verifyUser, login);

authRouter.get('/test', verifyAuth, success);

module.exports = authRouter;
