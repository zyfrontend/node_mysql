/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：moment.router.js
*   创 建 者：ZY
*   创建日期：2021年06月19日
*   描    述：
*
================================================================*/

const Router = require('koa-router');

const {
	verifyAuth,
	verifyPermission
} = require('../middlewave/auth.middlewave');
const {
	create,
	detail,
	list,
	update,
	remove,
	addLabels,
	fileInfo
} = require('../controller/moment.controller');
const {
	verifyLabel
} = require('../middlewave/label.middlewave');
const momentRouter = new Router({prefix: '/moment'});

momentRouter.post('/', verifyAuth, create);
momentRouter.get('/', list)
momentRouter.get('/:momentId', detail);
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update);
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove);


// 给动态添加标签接口
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabel, addLabels);

// 获取动态配图接口
momentRouter.get('/images/:filename', fileInfo);
module.exports = momentRouter;
