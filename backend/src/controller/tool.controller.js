import ToolService from '../service/tool.service.js'

async function createTool(req, res, next) {
	try {
		const tool = req.body
		if (!tool.description) {
			return res.status(400).json({ error: 'Descrição não informada!' })
		}
		res.send(await ToolService.createTool(tool))
		logger.info(`POST - /tool - ${JSON.stringify(tool)}`)
	} catch (error) {
		next(error)
	}
}

async function updateTool(req, res, next) {
	try {
		const tool = req.body
		if (!tool.description) {
			return res.status(400).json({ error: 'Descrição não informada!' })
		}
		res.send(await ToolService.updateTool(tool))
		logger.info(`PATCH - /tool - ${JSON.stringify(tool)}`)
	} catch (error) {
		next(error)
	}
}

async function getAllTools(req, res, next) {
	try {
		if (req.query.tool_status === 'true') {
			logger.info(`GET - /tool - ALL TOOLS WITH STATUS true}`)
			return res.send(await ToolService.getAllTools([true]))
		} else if (req.query.tool_status === 'false') {
			logger.info(`GET - /tool - ALL TOOLS WITH STATUS false}`)
			return res.send(await ToolService.getAllTools([false]))
		} else if (req.query.tool_status === '') {
			res.send(await ToolService.getAllTools([true, false]))
			logger.info(`GET - /tool - ALL TOOLS`)
		}
	} catch (error) {
		next(error)
	}
}

async function getTool(req, res, next) {
	try {
		res.send(await ToolService.getTool(req.params.tool_id))
		logger.info(`GET - /tool/:${req.params.tool_id}`)
	} catch (error) {
		next(error)
	}
}

async function deleteTool(req, res, next) {
	try {
		await ToolService.deleteTool(req.params.tool_id)

		res.status(200).json({ msg: 'Ferramenta deletada com sucesso!' })
		logger.info(`DELETE - /tool - ${req.params.tool_id}`)
	} catch (error) {
		next(error)
	}
}

async function disableEnableTool(req, res, next) {
	try {
		const tool = req.body
		res.send(await ToolService.disableEnableTool(tool))
		logger.info(`GET - /tool/ - ${JSON.stringify(tool)}`)
	} catch (error) {
		next(error)
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
