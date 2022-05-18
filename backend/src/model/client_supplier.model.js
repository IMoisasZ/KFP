import Sequelize from 'sequelize'
import dbConnection from '../connection/db.connection.js'

const ClientSupplier = dbConnection.define(
	'client_supplier',
	{
		client_supplier_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		type: {
			type: Sequelize.TINYINT,
			allowNull: false,
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
	{ tableName: 'client_supplier' },
)

export default ClientSupplier
