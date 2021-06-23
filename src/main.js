/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：main.js
*   创 建 者：ZY
*   创建日期：2021年06月15日
*   描    述：
*
================================================================*/
const app = require('./app/index');
require('./app/database');

const config = require('./app/config');
app.listen(config.APP_PORT, () => {
	console.log(`服务器在${config.APP_PORT}端口启动成功~`);

});

