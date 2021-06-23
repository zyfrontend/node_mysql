/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：index.js
*   创 建 者：ZY
*   创建日期：2021年06月18日
*   描    述：
*
================================================================*/

const fs = require('fs');

const UseRouter = (app) => {
	fs.readdirSync(__dirname).forEach(file => {
		if(file === 'index.js') return;
		const router = require(`./${file}`);
		app.use(router.routes());
		app.use(router.allowedMethods());
	});
};
module.exports = UseRouter;
