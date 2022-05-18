import ClientSupplierService from '../service/client_supplier.service.js'

async function createClientSupplier(req, res, next) {
	try {
		const clientSupplier = req.body
		if (!clientSupplier.type) {
			return res.status(400).json({ error: 'Tipo não seleconado!' })
		}
		if (!clientSupplier.name) {
			return res.status(400).json({ error: 'Nome não preenchido!' })
		}
		res.send(await ClientSupplierService.createClientSupplier(clientSupplier))
		logger.info(`POST - /client_supplier - ${JSON.stringify(clientSupplier)}`)
	} catch (error) {
		next(error)
	}
}

async function updateClientSupplier(req, res, next) {
	try {
		const clientSupplier = req.body
		if (!clientSupplier.type) {
			return res.status(400).json({ error: 'Tipo não seleconado!' })
		}
		if (!clientSupplier.name) {
			return res.status(400).json({ error: 'Nome não preenchido!' })
		}
		res.send(await ClientSupplierService.updateClientSupplier(clientSupplier))
		logger.info(`PACTH - /client_supplier - ${JSON.stringify(clientSupplier)}`)
	} catch (error) {
		next(error)
	}
}

async function getAllClientSupplier(req, res, next) {
	try {
		const client_supplier_status = req.query.client_supplier_status === 'true'
		if (client_supplier_status) {
			logger.info(
				`GET - /client_supplier - ALL CLIENTS AND SUPPLIER WITH STATUS = ${client_supplier_status}`,
			)
			return res.send(
				await ClientSupplierService.getAllClientSupplier(
					client_supplier_status,
				),
			)
		}
		res.send(await ClientSupplierService.getAllClientSupplier())
		logger.info(`GET - /client_supplier - ALL CLIENTS AND SUPPLIERS`)
	} catch (error) {
		next(error)
	}
}

async function getClientSupplier(req, res, next) {
	try {
		res.send(
			await ClientSupplierService.getClientSupplier(
				req.params.client_supplier_id,
			),
		)
		logger.info(`GET - /client_supplier - ${req.params.client_supplier_id}`)
	} catch (error) {
		next(error)
	}
}

async function deleteClientSupplier(req, res, next) {
	try {
		await ClientSupplierService.deleteClientSupplier(
			req.params.client_supplier_id,
		)

		res.status(200).json({ msg: 'Cliente / Fornecedor deletado com sucesso!' })
		logger.info(`DELETE - /client_supplier - ${req.params.client_supplier_id}`)
	} catch (error) {
		next(error)
	}
}

async function disableEnableClientSupplier(req, res, next) {
	try {
		const clientSupplier = req.body
		console.debug('controller', clientSupplier)
		res.send(
			await ClientSupplierService.disableEnableClientSupplier(clientSupplier),
		)
		logger.info(`PUT - /client_supplier - ${JSON.stringify(clientSupplier)}`)
	} catch (error) {
		next(error)
	}
}

export default {
	createClientSupplier,
	updateClientSupplier,
	getAllClientSupplier,
	getClientSupplier,
	deleteClientSupplier,
	disableEnableClientSupplier,
}
