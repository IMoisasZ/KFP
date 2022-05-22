import Sequelize from 'sequelize'
import dbConnection from '../connection/db.connection.js'

const Technician = dbConnection.define(
	'technician',
	{
		technician_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		last_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		rg: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		cpf: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		car: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		plate: {
			type: Sequelize.STRING,
			allowNull: true,
			unique: true,
		},
		system_user: {
			type: Sequelize.BOOLEAN,
			default: false,
		},
		role_id: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		actived: {
			type: Sequelize.BOOLEAN,
			default: true,
		},
	},
	{ tableName: 'technician' },
)

export default Technician
