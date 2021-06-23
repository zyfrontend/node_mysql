/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：password.handle.js
*   创 建 者：ZY
*   创建日期：2021年06月17日
*   描    述：对用户密码进行加密
*
================================================================*/
const crypto = require('crypto');

const md5password = (password) => {
	const md5 = crypto.createHash('md5');
	const result = md5.update(password).digest('hex');
	return result;
};

module.exports = md5password;

