import ClientSupplierRepository from '../repository/client_supplier.respository.js'

async function createClientSupplier(clientSupplier) {
	try {
		clientSupplier.name = clientSupplier.name.toUpperCase()
		return await ClientSupplierRepository.createClientSupplier(clientSupplier)
	} catch (error) {
		throw error
	}
}

async function updateClientSupplier(clientSupplier) {
	try {
		clientSupplier.name = clientSupplier.name.toUpperCase()
		return await ClientSupplierRepository.updateClientSupplier(clientSupplier)
	} catch (error) {
		throw error
	}
}

async function getAllClientSupplier(clientSupplierStatus) {
	try {
		if (clientSupplierStatus) {
			return await ClientSupplierRepository.getAllClientSupplierStatus(
				clientSupplierStatus,
			)
		}
		return await ClientSupplierRepository.getAllClientSupplier()
	} catch (error) {
		throw error
	}
}

async function getClientSupplier(client_supplier_id) {
	return await ClientSupplierRepository.getClientSupplier(client_supplier_id)
}

async function deleteClientSupplier(client_supplier_id) {
	return await ClientSupplierRepository.deleteClientSupplier(client_supplier_id)
}

async function disableEnableClientSupplier(clientSupplier) {
	console.debug('service', clientSupplier)
	return await ClientSupplierRepository.disableEnableClientSupplier(
		clientSupplier,
	)
}

export default {
	createClientSupplier,
	updateClientSupplier,
	getAllClientSupplier,
	getClientSupplier,
	deleteClientSupplier,
	disableEnableClientSupplier,
}
