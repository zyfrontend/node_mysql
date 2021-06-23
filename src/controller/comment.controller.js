/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：comment.contriller.js
*   创 建 者：ZY
*   创建日期：2021年06月23日
*   描    述：
*
================================================================*/
const commentService = require('../service/comment.service');
class CommentController {
	async create(ctx, next) {
		const { momentId, content }	= ctx.request.body;
		const { id } = ctx.user;
		const result = await commentService.create(momentId, content, id);
		ctx.body = result;
		}
}

module.exports = new CommentController();
