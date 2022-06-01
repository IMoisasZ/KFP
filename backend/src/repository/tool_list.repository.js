import ToolListModel from '../model/tool_list.model.js'
import TechnicianModel from '../model/technician.model.js'
import ToolModel from '../model/tool.model.js'
import { Op } from 'sequelize'

async function createToolList(toolList) {
	try {
		const newToolList = await ToolListModel.create(toolList)
		return await getToolList(newToolList.tool_list_id)
	} catch (error) {
		throw error
	}
}

async function updateToolList(toolList) {
	try {
		await ToolListModel.update(toolList, {
			where: {
				tool_list_id: toolList.tool_list_id,
			},
		})
		return await getToolList(toolList.tool_list_id)
	} catch (error) {
		throw error
	}
}

async function getAllToolList(technician_id) {
	try {
		return await ToolListModel.findAll({
			where: {
				technician_id,
			},
			include: [
				{
					model: ToolModel,
				},
				{
					model: TechnicianModel,
				},
			],
		})
	} catch (error) {
		throw error
	}
}

async function getToolList(tool_list_id) {
	try {
		return await ToolListModel.findAll({
			include: [
				{
					model: ToolModel,
				},
				{
					model: TechnicianModel,
				},
			],
			where: {
				tool_list_id,
			},
		})
	} catch (error) {
		throw error
	}
}

async function getToolByTechnicianAndTool(technician_id, tool_id) {
	try {
		return await ToolListModel.findOne({
			where: {
				[Op.and]: [{ technician_id }, { tool_id }],
			},
		})
	} catch (error) {
		throw error
	}
}

async function deleteToolList(tool_list_id) {
	try {
		return await ToolListModel.destroy({
			where: {
				tool_list_id,
			},
		})
	} catch (error) {
		throw error
	}
}

export default {
	createToolList,
	updateToolList,
	getAllToolList,
	getToolList,
	getToolByTechnicianAndTool,
	deleteToolList,
}
