import ToolListRepository from '../repository/tool_list.repository.js'

async function createToolList(toolList) {
	try {
		const tool = await ToolListRepository.getToolByTechnicianAndTool(
			toolList.technician_id,
			toolList.tool_id,
		)

		if (tool) {
			throw new Error('Ferramenta já incluída para o técnico')
		}

		return await ToolListRepository.createToolList(toolList)
	} catch (error) {
		throw error
	}
}

async function updateToolList(toolList) {
	return await ToolListRepository.updateToolList(toolList)
}

async function getAllToolList(technician_id) {
	return await ToolListRepository.getAllToolList(technician_id)
}

async function getToolList(tool_list_id) {
	return await ToolListRepository.getToolList(tool_list_id)
}

async function deleteToolList(tool_list_id) {
	return await ToolListRepository.deleteToolList(tool_list_id)
}

export default {
	createToolList,
	updateToolList,
	getAllToolList,
	getToolList,
	deleteToolList,
}
