/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：label.router.js
*   创 建 者：ZY
*   创建日期：2021年06月27日
*   描    述：
*
================================================================*/

const Router = require('koa-router');

const {
	create,
	list
} = require('../controller/label.controller');
const {
	verifyAuth
} = require('../middlewave/auth.middlewave');


const labelRouter = new Router({prefix: '/label'});

labelRouter.post('/', verifyAuth, create);
labelRouter.get('/', list);


module.exports = labelRouter;
