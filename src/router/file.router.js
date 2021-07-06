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
// 存储区域
const {
	avatarHandle,
	pictureHandle
} = require('../middlewave/file.middlewave');
// 验证权限
const {
	verifyAuth,
} = require('../middlewave/auth.middlewave');
// 操作数据
const {
	saveAvatarInfo,
	savePictureInfo
} = require('../controller/file.controller');
// 头像上传借口
fileRouter.post('/', verifyAuth, avatarHandle, saveAvatarInfo);
// 动态图片上传接口
fileRouter.post('/picture', verifyAuth, pictureHandle, savePictureInfo);

module.exports = fileRouter;

