import ToolModel from '../model/tool.model.js'

async function createTool(tool) {
	try {
		const newTool = await ToolModel.create(tool)
		return await getTool(newTool.tool_id)
	} catch (error) {
		throw new Error('Ferramenta já cadastrada!')
	}
}

async function updateTool(tool) {
	try {
		await ToolModel.update(tool, {
			where: {
				tool_id: tool.tool_id,
			},
		})
		return await getTool(tool.tool_id)
	} catch (error) {
		throw new Error('Ferramenta já cadastrada!')
	}
}

async function getAllTools(toolStatus) {
	try {
		if (toolStatus === true || toolStatus === false) {
			return await ToolModel.findAll({
				where: {
					actived: toolStatus,
				},
			})
		} else if (toolStatus === undefined) {
			return await ToolModel.findAll()
		}
	} catch (error) {
		throw error
	}
}

async function getTool(tool_id) {
	try {
		return await ToolModel.findByPk(tool_id)
	} catch (error) {
		throw error
	}
}

async function deleteTool(tool_id) {
	try {
		await ToolModel.destroy({
			where: {
				tool_id,
			},
		})
	} catch (error) {
		throw error
	}
}

async function disableEnableTool(tool) {
	try {
		await ToolModel.update(
			{
				actived: tool.actived,
			},
			{
				where: {
					tool_id: tool.tool_id,
				},
			},
		)
		return await getTool(tool.tool_id)
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
