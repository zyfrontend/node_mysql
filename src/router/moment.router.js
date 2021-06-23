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
	remove
} = require('../controller/moment.controller');
const momentRouter = new Router({prefix: '/moment'});

momentRouter.post('/', verifyAuth, create);
momentRouter.get('/', list)
momentRouter.get('/:momentId', detail);
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update);
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove);


module.exports = momentRouter;
