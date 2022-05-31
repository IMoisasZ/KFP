import ToolListService from '../service/tool_list.service.js'

async function createToolList(req, res, next) {
	try {
		const toolList = req.body
		if (!toolList.technician_id) {
			return res.status(400).json({ error: 'Técnico não informado' })
		}

		if (!toolList.tool_id) {
			return res.status(400).json({ error: 'Ferramenta não informada' })
		}

		if (!toolList.quantity) {
			return res.status(400).json({ error: 'Quantidade não informada' })
		}

		res.send(await ToolListService.createToolList(toolList))
		logger.info(`POST /tool_list - ${JSON.stringify(toolList)}`)
	} catch (error) {
		next(error)
	}
}

async function updateToolList(req, res, next) {
	try {
		const toolList = req.body
		if (!toolList.technician_id) {
			return res.status(400).json({ error: 'Técnico não informado' })
		}

		if (!toolList.tool_id) {
			return res.status(400).json({ error: 'Ferramenta não informada' })
		}

		if (!toolList.quantity) {
			return res.status(400).json({ error: 'Quantidade não informada' })
		}

		res.send(await ToolListService.updateToolList(toolList))
		logger.info(`PATCH /tool_list - ${JSON.stringify(toolList)}`)
	} catch (error) {
		next(error)
	}
}

async function getAllToolList(req, res, next) {
	try {
		res.send(await ToolListService.getAllToolList(req.params.technician_id))
		logger.info(
			`GET /tool_list/all_tools_technician/:${req.params.technician_id}`,
		)
	} catch (error) {
		next(error)
	}
}

async function getToolList(req, res, next) {
	try {
		res.send(await ToolListService.getToolList(req.params.tool_list_id))
		logger.info(`GET /tool_list/list_id/:${req.params.tool_list_id}`)
	} catch (error) {
		next(error)
	}
}

async function deleteToolList(req, res, next) {
	try {
		res.send(await ToolListService.deleteToolList(req.params.tool_list_id))
		logger.info(`DELETE /tool_list/:${req.params.tool_list_id}`)
	} catch (error) {
		next(error)
	}
}

export default {
	createToolList,
	updateToolList,
	getAllToolList,
	getToolList,
	deleteToolList,
}
