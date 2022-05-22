import TechnicianService from '../service/technician.service.js'

async function createTechnician(req, res, next) {
	try {
		const technician = req.body
		if (!technician.name) {
			return res.status(400).json({ error: 'Nome não informado!' })
		}
		if (!technician.last_name) {
			return res.status(400).json({ error: 'Sobrenome não informado!' })
		}
		if (!technician.rg) {
			return res.status(400).json({ error: 'RG não informado!' })
		}
		if (!technician.cpf) {
			return res.status(400).json({ error: 'CPF não informado!' })
		}
		res.send(await TechnicianService.createTechnician(technician))
		logger.info(`POST - /technician - ${JSON.stringify(technician)}`)
	} catch (error) {
		next(error)
	}
}

async function updateTechnician(req, res, next) {
	try {
		const technician = req.body
		if (!technician.name) {
			return res.status(400).json({ error: 'Nome não informado!' })
		}
		if (!technician.last_name) {
			return res.status(400).json({ error: 'Sobrenome não informado!' })
		}
		if (!technician.rg) {
			return res.status(400).json({ error: 'RG não informado!' })
		}
		if (!technician.cpf) {
			return res.status(400).json({ error: 'CPF não informado!' })
		}
		res.send(await TechnicianService.updateTechnician(technician))
		logger.info(`PATCH - /technician - ${JSON.stringify(technician)}`)
	} catch (error) {
		next(error)
	}
}

async function getAllTechnicians(req, res, next) {
	try {
		if (req.query.technician_status === 'true') {
			logger.info(`GET - /technician - ALL TECHNICIANS WITH STATUS true}`)
			return res.send(await TechnicianService.getAllTechnicians([true]))
		} else if (req.query.technician_status === 'false') {
			logger.info(`GET - /technician - ALL TECHNICIANS WITH STATUS false}`)
			return res.send(await TechnicianService.getAllTechnicians([false]))
		} else if (req.query.technician_status === '') {
			res.send(await TechnicianService.getAllTechnicians([true, false]))
			logger.info(`GET - /technician - ALL TECHNICIANS`)
		}
	} catch (error) {
		next(error)
	}
}

async function getTechnician(req, res, next) {
	try {
		res.send(await TechnicianService.getTechnician(req.params.technician_id))
		logger.info(`GET - /technician/:${req.params.technician_id}`)
	} catch (error) {
		next(error)
	}
}

async function deleteTechnician(req, res, next) {
	try {
		await TechnicianService.deleteTechnician(req.params.technician_id)

		res.status(200).json({ msg: 'Técnico deletado com sucesso!' })
		logger.info(`DELETE - /technician - ${req.params.technician_id}`)
	} catch (error) {
		next(error)
	}
}

async function disableEnableTechnician(req, res, next) {
	try {
		const technician = req.body
		res.send(await TechnicianService.disableEnableTechnician(technician))
		logger.info(`GET - /technician/ - ${JSON.stringify(technician)}`)
	} catch (error) {
		next(error)
	}
}

export default {
	createTechnician,
	updateTechnician,
	getAllTechnicians,
	getTechnician,
	deleteTechnician,
	disableEnableTechnician,
}
