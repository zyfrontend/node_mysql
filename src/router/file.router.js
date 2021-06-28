/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：file.router.js
*   创 建 者：ZY
*   创建日期：2021年06月27日
*   描    述：
*
================================================================*/
const Router = require('koa-router');
const Multer = require('koa-multer');


const fileRouter = new Router({prefix: '/upload'});

const avatarUpload = Multer({
	dest: './upload/avatar'
});

const avatarHandle = avatarUpload.single('avatar');

const {
	verifyAuth
} = require('../middlewave/auth.middlewave');

const {
	saveAvatarInfo
} = require('../controller/file.controller');

fileRouter.post('/', verifyAuth, avatarHandle, saveAvatarInfo);

module.exports = fileRouter;

