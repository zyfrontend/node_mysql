/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：file.controller.js
*   创 建 者：ZY
*   创建日期：2021年06月27日
*   描    述：
*
================================================================*/
const fileService = require('../service/file.service');
const userService = require('../service/user.service');
const { APP_HOST, APP_PORT } = require('../app/config')
const {
	AVATAR_PATH
} =  require('../constants/file.path');

class FileUpload {
	async saveAvatarInfo(ctx, next){
		// 获取用户数据
		const { filename, mimetype, size } = ctx.req.file;
		const { id } = ctx.user;
		// 操作数据
			// 保存到数据库中
		const result = await fileService.createAvatar(filename, mimetype, size, id);
			// 将图片地址保存到数据库
		const avatarURL = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;

			// 更新avatarURL数据
		await userService.updateAvatarURL(id, avatarURL);
		// 返回信息
		ctx.body = '上传成功';
		};
	async savePictureInfo(ctx, next){
		// 获取用户数据
		const files = ctx.req.files;
		const { id } = ctx.user;
		const { momentId } = ctx.query;
		// 操作数据
		for(let file of files) {
			const { filename, mimetype, size } = file;
			await fileService.createFile(filename, mimetype, size, id, momentId);
		}
		// 返回信息
		ctx.body = '动态配图上传完成';
		}
	};

module.exports = new FileUpload();
