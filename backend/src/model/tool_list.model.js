import Sequelize from 'sequelize'
import dbConnection from '../connection/db.connection.js'
import TechnicianModel from './technician.model.js'
import ToolModel from './tool.model.js'

const ToolList = dbConnection.define(
	'tool_list',
	{
		tool_list_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		date_tool_list: {
			type: Sequelize.DATE,
			allowNull: false,
			default: Sequelize.fn('now'),
		},
		technician_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		tool_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		quantity: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	},
	{ tableName: 'tool_list' },
)

ToolList.belongsTo(TechnicianModel, { foreignKey: 'technician_id' })
ToolList.belongsTo(ToolModel, { foreignKey: 'tool_id' })
export default ToolList
