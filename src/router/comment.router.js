/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：comment.router.js
*   创 建 者：ZY
*   创建日期：2021年06月22日
*   描    述：
*
================================================================*/

const Router = require('koa-router');

const {
	verifyAuth
} = require('../middlewave/auth.middlewave');
const {
	create,
	reply,
	update
} = require('../controller/comment.controller');

const commentRouter = new Router({prefix: '/comment'});

commentRouter.post('/', verifyAuth, create);
commentRouter.post ('/:commentId/reply', verifyAuth, reply);
commentRouter.patch('/:commentId', verifyAuth, update);
module.exports = commentRouter;
