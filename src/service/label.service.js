/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：label.service.js
*   创 建 者：ZY
*   创建日期：2021年06月27日
*   描    述：
*
================================================================*/
const connection = require('../app/database');

class LabelService {
	async create(name) {
		const statement = `
		INSERT INTO label (name) VALUES (?);	
		`;
		const [result] = await connection.execute(statement, [name]);
		return result;
	}
}

module .exports = new LabelService();
