/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：moment.controller.js
*   创 建 者：ZY
*   创建日期：2021年06月19日
*   描    述：
*
================================================================*/
const momentService = require('../service/moment.service');
class MonmentController {
	async create(ctx, next) {
		const userId = ctx.user.id;
		const content = ctx.request.body.content;
		const result = await momentService.create(userId, content);
		
		ctx.body = result;
		};
	async detail(ctx, next) {
		//1. 获取id
		const momentId = ctx.params.momentId;

		// 2. 查询数据库
		const result = await momentService.getMomentBy(momentId);
		ctx.body = result;
		};
	async list(ctx, next) {
		const { offset, size } = ctx.query;
		const result = await momentService.getMomentList(offset, size);
		ctx.body = result;
		};
	async update(ctx, next) {
		const momentId = ctx.params.momentId;
		const content = ctx.request.body.content;
		const { id } = ctx.user;
		const result = await momentService.update(content, momentId);
		ctx.body = result;
		};
	async remove(ctx, next) {
		const { momentId } = ctx.params;
		const result = await momentService.remove(momentId);
		ctx.body = result;
		}
}

module.exports = new MonmentController();

