import ClientSupplierModel from '../model/client_supplier.model.js'

async function createClientSupplier(clientSupplier) {
	try {
		const newCliSup = await ClientSupplierModel.create(clientSupplier)
		return await getClientSupplier(newCliSup.client_supplier_id)
	} catch (error) {
		throw error
	}
}

async function updateClientSupplier(clientSupplier) {
	try {
		await ClientSupplierModel.update(clientSupplier, {
			where: {
				client_supplier_id: clientSupplier.client_supplier_id,
			},
		})
		return await getClientSupplier(clientSupplier.client_supplier_id)
	} catch (error) {
		throw error
	}
}

async function getAllClientSupplier() {
	try {
		return await ClientSupplierModel.findAll()
	} catch (error) {
		throw error
	}
}

async function getAllClientSupplierStatus(clientSupplierStatus) {
	try {
		return await ClientSupplierModel.findAll({
			where: {
				actived: clientSupplierStatus,
			},
		})
	} catch (error) {
		throw error
	}
}

async function getClientSupplier(client_supplier_id) {
	try {
		return await ClientSupplierModel.findByPk(client_supplier_id)
	} catch (error) {
		throw error
	}
}

async function deleteClientSupplier(client_supplier_id) {
	try {
		return await ClientSupplierModel.destroy({
			where: {
				client_supplier_id,
			},
		})
	} catch (error) {
		throw error
	}
}

async function disableEnableClientSupplier(clientSupplier) {
	console.debug('repository', clientSupplier)
	try {
		await ClientSupplierModel.update(
			{
				actived: clientSupplier.actived,
			},
			{
				where: {
					client_supplier_id: clientSupplier.client_supplier_id,
				},
			},
		)
		return await getClientSupplier(clientSupplier.client_supplier_id)
	} catch (error) {
		throw error
	}
}

export default {
	createClientSupplier,
	updateClientSupplier,
	getAllClientSupplier,
	getAllClientSupplierStatus,
	getClientSupplier,
	deleteClientSupplier,
	disableEnableClientSupplier,
}
