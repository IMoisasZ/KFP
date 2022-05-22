import ClientService from '../service/client.service.js'

async function createClient(req, res, next) {
	try {
		const client = req.body
		if (!client.name) {
			return res.status(400).json({ error: 'Nome não preenchido!' })
		}
		res.send(await ClientService.createClient(client))
		logger.info(`POST - /client - ${JSON.stringify(client)}`)
	} catch (error) {
		next(error)
	}
}

async function updateClient(req, res, next) {
	try {
		const client = req.body
		if (!client.name) {
			return res.status(400).json({ error: 'Nome não preenchido!' })
		}
		res.send(await ClientService.updateClient(client))
		logger.info(`PATCH - /client - ${JSON.stringify(client)}`)
	} catch (error) {
		next(error)
	}
}

async function getAllClient(req, res, next) {
	try {
		if (req.query.client_status === 'true') {
			console.log('true - here')
			logger.info(`GET - /client - ALL CLIENTS WITH STATUS true}`)
			return res.send(await ClientService.getAllClient([true]))
		} else if (req.query.client_status === 'false') {
			console.log('false - here')
			logger.info(`GET - /client - ALL CLIENTS WITH STATUS false}`)
			return res.send(await ClientService.getAllClient([false]))
		} else if (req.query.client_status === '') {
			res.send(await ClientService.getAllClient([true, false]))
			logger.info(`GET - /client - ALL CLIENTS`)
		}
	} catch (error) {
		next(error)
	}
}

async function getClient(req, res, next) {
	try {
		res.send(await ClientService.getClient(req.params.client_id))
		logger.info(`GET - /client - ${req.params.client_id}`)
	} catch (error) {
		next(error)
	}
}

async function deleteClient(req, res, next) {
	try {
		await ClientService.deleteClient(req.params.client_id)

		res.status(200).json({ msg: 'Cliente deletado com sucesso!' })
		logger.info(`DELETE - /client - ${req.params.client_id}`)
	} catch (error) {
		next(error)
	}
}

async function disableEnableClient(req, res, next) {
	try {
		const client = req.body

		res.send(await ClientService.disableEnableClient(client))
		logger.info(`PUT - /client - ${JSON.stringify(client)}`)
	} catch (error) {
		next(error)
	}
}

export default {
	createClient,
	updateClient,
	getAllClient,
	getClient,
	deleteClient,
	disableEnableClient,
}
