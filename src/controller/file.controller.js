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


class FileUpload {
	async saveAvatarInfo(ctx, next){
		const { filename, mimetype, size } = ctx.req.file;
		const { id } = ctx.user;
		const result = await fileService.createAvatar(filename, mimetype, size, id);
		ctx.body = result;
		};
	};

module.exports = new FileUpload();
