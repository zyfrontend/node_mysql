/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：auth.middlewave.js
*   创 建 者：ZY
*   创建日期：2021年06月17日
*   描    述：
*
================================================================*/
const jwt = require('jsonwebtoken');

const errorType = require('../constants/error.types');

const userService = require('../service/user.service');
const authService = require('../service/auth.service');
const md5password = require('../utils/password.handle');
const { PUBLIC_KEY } = require('../app/config');

const verifyUser = async (ctx, next) => {
	console.log("登录验证的middlewave")
	// 获取用户帐号密码
	const { name, password } = ctx.request.body;
	// 判断用户名和密码是否为空
	if(!name || !password || name == '' || password == ''){
		const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
		return ctx.app.emit('error', error, ctx);
		};
	// 判断用户名是否存在
	const result = await userService.getUserByName(name);
	const user = result[0]; 
	if(!user){
		const error = new Error(errorType.USER_DOES_NOT_EXISTS);
		return ctx.app.emit('error', error, ctx);
		};
	// 判断密码是否一致
	if(md5password(password) !== user.password) {
		const error = new Error(errorType.PASSWORD_IS_INCORRENT);
		return ctx.app.emit('error', error, ctx);
		};
	ctx.user = user;
	await next();
};

const verifyAuth = async (ctx, next) => {
	console.log("验证授权的middlewave");
	// 获取 token
	const authorization = ctx.headers.authorization;
	if(!authorization){
		const error = new Error(errorType.UNAUTHORIZATION_TOKEN);
		return ctx.app.emit('error', error, ctx);
		}
	const token = authorization.replace('Bearer ', '');
	// 验证 token
	try{
		const result = jwt.verify(token, PUBLIC_KEY, {
		algorithms: ["RS256"]
			});
		ctx.user = result;
		await next();
		} catch (err){
			const error = new Error(errorType.UNAUTHORIZATION_TOKEN);
			return ctx.app.emit('error', error, ctx);
			};

};
/*
* 1. 验证权限
*			一般 修改删除 动态 评论 都是需要验证权限的
*	2. 接口
*			业务接口系统
*			后端管理系统
*				两个系统所使用的是两个不同的接口
*		一对一： user -> role
*		多对多： role -> menu（修改删除 动态）
* */
const verifyPermission = async (ctx, next) => {
	console.log("验证权限的middlewave");
	// 1. 获取用户信息
	const { momentId } = ctx.params;
	const { id } = ctx.user;
	// 2. 查询是否具备权限
	try{
		const isPermission = await authService.checkMoment(momentId, id);
		console.log(isPermission);
		if(!isPermission) throw new Error();
		await next();
		} catch(err) {
		const error = new Error(errorType.UNPERMISSION);
		return ctx.app.emit('error', error, ctx);
		}
	};

module.exports = {
	verifyUser,
	verifyAuth,
	verifyPermission
}
