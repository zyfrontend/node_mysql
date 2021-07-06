/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：file.middlewave.js
*   创 建 者：ZY
*   创建日期：2021年07月06日
*   描    述：
*
================================================================*/

const Multer = require('koa-multer');

const { 
	AVATAR_PATH,
	PICTURE_PATH
	} = require('../constants/file.path');

const avatarUpload = Multer({
	dest: AVATAR_PATH
});
const avatarHandle = avatarUpload.single('avatar');

const pictureUpload = Multer({
	dest: PICTURE_PATH
});
const pictureHandle = pictureUpload.array('picture');

module.exports = {
	avatarHandle,
	pictureHandle
}
