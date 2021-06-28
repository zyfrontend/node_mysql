/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：error.handle.js
*   创 建 者：ZY
*   创建日期：2021年06月17日
*   描    述：
*
================================================================*/
const errorTypes = require('../constants/error.types');
const errorHandle = (error, ctx) => {
	let status, message;
	switch (error.message){
			case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
				status = 400;
				message = "用户名或者密码不能为空~";
			break;
			case errorTypes.NAME_ALREADy_EXISTS:
				status = 409;
				message = "用户名重复~";
			break;
			case errorTypes.USER_DOES_NOT_EXISTS:
				status = 400;
				message = "用户名不存在";
			break;
			case errorTypes.PASSWORD_IS_INCORRENT:
				status = 400;
				message = "密码不正确";
			break;	
			case errorTypes.UNAUTHORIZATION_TOKEN:
				status = 401;
				message = "无效Token";
			break;	
			case errorTypes.UNPERMISSION:
				status = 401;
				message = "您不具备操作权限";
			break;
			case errorTypes.SQL_ERROR:
				status = 401;
				message = "SQL语句出错";
			break;

			default:
				status = 404;
				message = "NOT FOUND";
			}
	ctx.status = status;
	ctx.body = message;
};

module.exports = errorHandle;
