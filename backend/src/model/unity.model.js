import Sequelize from 'sequelize'
import dbConnection from '../connection/db.connection.js'

const Unity = dbConnection.define(
	'unity',
	{
		unity_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		unity_tag: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		unity_description: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		unity_actived: {
			type: Sequelize.BOOLEAN,
			default: true,
		},
	},
	{ tableName: 'unity' },
)

export default Unity
