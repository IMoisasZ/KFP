import ToolRepository from '../repository/tool.repository.js'

async function createTool(tool) {
	try {
		tool.description = tool.description.toUpperCase()
		return await ToolRepository.createTool(tool)
	} catch (error) {
		throw error
	}
}

async function updateTool(tool) {
	try {
		tool.description = tool.description.toUpperCase()
		return await ToolRepository.updateTool(tool)
	} catch (error) {
		throw error
	}
}

async function getAllTools(tool) {
	try {
		if (tool.length === 1) {
			return await ToolRepository.getAllTools(tool[0])
		} else {
			return await ToolRepository.getAllTools()
		}
	} catch (error) {
		throw error
	}
}

async function getTool(tool_id) {
	try {
		return await ToolRepository.getTool(tool_id)
	} catch (error) {
		throw error
	}
}

async function deleteTool(tool_id) {
	try {
		return await ToolRepository.deleteTool(tool_id)
	} catch (error) {
		throw error
	}
}

async function disableEnableTool(tool) {
	try {
		return await ToolRepository.disableEnableTool(tool)
	} catch (error) {
		throw error
	}
}

export default {
	createTool,
	updateTool,
	getAllTools,
	getTool,
	deleteTool,
	disableEnableTool,
}
