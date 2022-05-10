import Sequelize from 'sequelize'
import dbConnection from '../connection/db.connection.js'
import UnityModel from './unity.model.js'

const Product = dbConnection.define(
	'product',
	{
		product_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		internal_code: {
			type: Sequelize.STRING,
			allowNull: false,
			unituqe: true,
		},
		description: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		weight_per_meter: {
			type: Sequelize.NUMBER,
			allowNull: true,
		},
		unity_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		minimum_amount: {
			type: Sequelize.NUMBER,
			allowNull: true,
		},
		actived: {
			type: Sequelize.BOOLEAN,
			default: true,
		},
	},
	{ tableName: 'product' },
)

Product.belongsTo(UnityModel, { foreignKey: 'unity_id' })

export default Product
