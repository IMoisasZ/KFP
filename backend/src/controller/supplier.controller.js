import SupplierService from '../service/supplier.service.js'

async function createSupplier(req, res, next) {
	try {
		const supplier = req.body
		if (!supplier.name) {
			return res.status(400).json({ error: 'Nome não foi preenchido!' })
		}
		res.send(await SupplierService.createSupplier(supplier))
		logger.info(`POST - /supplier - ${JSON.stringify(supplier)}`)
	} catch (error) {
		next(error)
	}
}

async function updateSupplier(req, res, next) {
	try {
		const supplier = req.body
		if (!supplier.name) {
			return res.status(400).json({ error: 'Nome não foi preenchido!' })
		}
		res.send(await SupplierService.updateSupplier(supplier))
		logger.info(`PACTH - /supplier - ${JSON.stringify(supplier)}`)
	} catch (error) {
		next(error)
	}
}

async function getAllSupplier(req, res, next) {
	try {
		if (req.query.supplier_status === 'true') {
			console.log('true - here')
			logger.info(`GET - /supplier - ALL SUPPLIERS WITH STATUS true}`)
			return res.send(await SupplierService.getAllSupplier([true]))
		} else if (req.query.supplier_status === 'false') {
			console.log('false - here')
			logger.info(`GET - /supplier - ALL SUPPLIERS WITH STATUS false}`)
			return res.send(await SupplierService.getAllSupplier([false]))
		} else if (req.query.supplier_status === '') {
			res.send(await SupplierService.getAllSupplier([true, false]))
			logger.info(`GET - /supplier - ALL SUPPLIERS`)
		}
	} catch (error) {
		next(error)
	}
}

async function getSupplier(req, res, next) {
	try {
		res.send(await SupplierService.getSupplier(req.params.supplier_id))
		logger.info(`GET - /supplier - ${req.params.supplier_id}`)
	} catch (error) {
		next(error)
	}
}

async function deleteSupplier(req, res, next) {
	try {
		await SupplierService.deleteSupplier(req.params.supplier_id)

		res.status(200).json({ msg: 'Fornecedor deletado com sucesso!' })
		logger.info(`DELETE - /supplier - ${req.params.supplier_id}`)
	} catch (error) {
		next(error)
	}
}

async function disableEnableSupplier(req, res, next) {
	try {
		const supplier = req.body

		res.send(await SupplierService.disableEnableSupplier(supplier))
		logger.info(`PUT - /supplier - ${JSON.stringify(supplier)}`)
	} catch (error) {
		next(error)
	}
}

export default {
	createSupplier,
	updateSupplier,
	getAllSupplier,
	getSupplier,
	deleteSupplier,
	disableEnableSupplier,
}
