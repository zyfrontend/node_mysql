/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：user.router.js
*   创 建 者：ZY
*   创建日期：2021年06月15日
*   描    述：
*
================================================================*/

const Router = require('koa-router');
const {
	verifyUser,
	handlePassword
} = require('../middlewave/user.middlewave');
const {
	create,
	getAvatarInfo
} = require('../controller/user.controller')
const userRouter = new Router({prefix: '/users'});

userRouter.post('/', verifyUser, handlePassword, create);
userRouter.get('/:userId/avatar', getAvatarInfo);
module.exports = userRouter;
