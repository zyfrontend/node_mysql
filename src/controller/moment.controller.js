/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：moment.controller.js
*   创 建 者：ZY
*   创建日期：2021年06月19日
*   描    述：
*
================================================================*/
const fs = require('fs');

const momentService = require('../service/moment.service');
const fileService = require('../service/file.service');
const { PICTURE_PATH } = require('../constants/file.path');

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
		};
	async addLabels(ctx, next) {
		// 获取标签和动态id
		const { momentId } = ctx.params;
		const { labels } = ctx;
		// 添加所有标签
		// 判断标签是否和动态有关系
		for(let label of labels){
			const isExist = await momentService.hasLabel(momentId, label.id);
			if(!isExist){
				await momentService.addLabels(momentId, label.id);
				}
			}
		ctx.body = '添加标签成功'
		};
	async fileInfo(ctx, next) {
		const { filename } = ctx.params;
		const fileInfo = await fileService.getFileByFilename(filename);
		
		ctx.response.set('content-type', fileInfo.mimetype);
		ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
		} 
}

module.exports = new MonmentController();

