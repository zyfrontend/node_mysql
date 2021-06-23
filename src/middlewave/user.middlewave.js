/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：user.middlewave.js
*   创 建 者：ZY
*   创建日期：2021年06月17日
*   描    述：
*
================================================================*/
const errorType = require('../constants/error.types');
const service = require('../service/user.service');
const md5password = require('../utils/password.handle')
const verifyUser = async (ctx, next) => {
	const { name, password } = ctx.request.body;
	// 1. 判断用户名和密码是否为空
	if(!name || !password || name == '' || password == '') {
		const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
		return ctx.app.emit('error', error, ctx);
		};
	// 2. 判断用户名是否重复
	// result 等于数据库返回的name
	// 则代表重复
	const result = await service.getUserByName(name);
	if(result.length) {
		const error = new Error(errorType.NAME_ALREADy_EXISTS);
		return ctx.app.emit('error', error, ctx);
		}
	await next();
};

const handlePassword = async (ctx, next) => {
	const { password } = ctx.request.body;
	ctx.request.body.password = md5password(password);
	await next();
};

module.exports = {
	verifyUser,
	handlePassword
}
