import Sequelize from 'sequelize'
import dbConnection from '../connection/db.connection.js'

const Supplier = dbConnection.define(
	'supplier',
	{
		supplier_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		actived: {
			type: Sequelize.BOOLEAN,
			default: true,
		},
	},
	{ tableName: 'supplier' },
)

export default Supplier
