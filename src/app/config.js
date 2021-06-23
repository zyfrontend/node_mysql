/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：config.js
*   创 建 者：ZY
*   创建日期：2021年06月15日
*   描    述：
*
================================================================*/

const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');


dotenv.config();

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './key/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './key/public.key'));

module.exports = {
	APP_PORT,
	MYSQL_HOST,
	MYSQL_PORT,
	MYSQL_DATABASE,
	MYSQL_USER,
	MYSQL_PASSWORD
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
