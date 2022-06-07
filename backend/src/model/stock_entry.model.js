import Sequelize from 'sequelize'
import DbConnection from '../connection/db.connection.js'

const StockEntry = DbConnection.define(
	'stock_entry',
	{
		stock_entry_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		opening_balance: {
			type: Sequelize.BOOLEAN,
			default: false,
		},
		date: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
		},
		client_id: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		supplier_id: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		nf: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		product_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		quantity: {
			type: Sequelize.DECIMAL,
			allowNull: false,
		},
		price: {
			type: Sequelize.DECIMAL,
			allowNull: true,
		},
	},
	{ tableName: 'stock_entry' },
)

export default StockEntry
