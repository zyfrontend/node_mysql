/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：label.middlewave.js
*   创 建 者：ZY
*   创建日期：2021年07月01日
*   描    述：
*
================================================================*/
const labelService = require('../service/label.service');
const verifyLabel = async (ctx, next) => {
	// 1.取出所有标签
	const { labels } = ctx.request.body;
	// 2.遍历标签
	const newLabels = [];
	for(let name of labels){
		const labelResult = await labelService.getLabelByName(name);
		const label = { name };
		// 判断标签是否存在
		if(!labelResult){
			// 创建标签
			const result = await labelService.create(name);
			label.id = result.insertId;
			} else {
				label.id = labelResult.id;
				}
				newLabels.push(label);
		}
	console.log(newLabels);
	ctx.labels = newLabels;
	await next();
} 

module.exports = {
	verifyLabel
}
