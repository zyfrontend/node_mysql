/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：label.controller.js
*   创 建 者：ZY
*   创建日期：2021年06月27日
*   描    述：
*
================================================================*/
const labelService = require('../service/label.service');

class LabelController {
	async create(ctx, next){
		const { name } = ctx.request.body;
		const result = await labelService.create(name);
		ctx.body = result;
		};
	async list(ctx, next){
		const { limit, offset } = ctx.query;
		const result = await labelService.getLabelList(limit, offset);
		ctx.body = result;
		}
}

module.exports = new LabelController();
