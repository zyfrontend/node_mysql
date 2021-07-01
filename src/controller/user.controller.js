/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：user.controller.js
*   创 建 者：ZY
*   创建日期：2021年06月15日
*   描    述：
*
================================================================*/
const fs = require('fs');


const userService = require('../service/user.service');
const fileService = require('../service/file.service');
const { AVATAR_PATH } = require('../constants/file.path');

class UserController {
	async create(ctx, next){
		// 获取用户请求传递的数据
		const user = ctx.request.body;	
		// 查询数据
		const result = await userService.create(user);	
		// 返回数据
		ctx.body = result;
		};
	async getAvatarInfo(ctx, next){
		const { userId } = ctx.params;
		const getavatar = await fileService.getAvatar(userId);
		ctx.body = fs.createReadStream(`${AVATAR_PATH}/${getavatar.filename}`);
		}
}

module.exports = new UserController();

