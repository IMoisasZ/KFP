import Sequelize from 'sequelize'
import dbConnection from '../connection/db.connection.js'

const Tool = dbConnection.define(
	'tool',
	{
		tool_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		description: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		actived: {
			type: Sequelize.BOOLEAN,
			defualt: true,
		},
	},
	{ tableName: 'tool' },
)

export default Tool
