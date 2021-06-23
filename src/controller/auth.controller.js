/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：auth.controller.js
*   创 建 者：ZY
*   创建日期：2021年06月17日
*   描    述：
*
================================================================*/
const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config');
// 登录成功提示
// 颁发签名
class AuthController {
	async login(ctx, next){
		const { id, name } = ctx.user;
		const token = jwt.sign({id, name}, PRIVATE_KEY, {
			expiresIn: 60 * 60 * 24,
			algorithm: "RS256"
			})
		ctx.body = {
			id,
			name,
			token
			}
		};
	async success(ctx, next){
		ctx.body = "success true";
		}
} 
module.exports = new AuthController();
