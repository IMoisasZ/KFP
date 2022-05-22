import SupplierRepository from '../repository/supplier.respository.js'

async function createSupplier(supplier) {
	try {
		console.log(supplier)
		supplier.name = supplier.name.toUpperCase()
		return await SupplierRepository.createSupplier(supplier)
	} catch (error) {
		throw error
	}
}

async function updateSupplier(supplier) {
	try {
		supplier.name = supplier.name.toUpperCase()
		return await SupplierRepository.updateSupplier(supplier)
	} catch (error) {
		throw error
	}
}

async function getAllSupplier(supplier) {
	try {
		if (supplier.length === 1) {
			return await SupplierRepository.getAllSupplier(supplier[0])
		} else {
			return await SupplierRepository.getAllSupplier()
		}
	} catch (error) {
		throw error
	}
}

async function getSupplier(supplier_id) {
	return await SupplierRepository.getSupplier(supplier_id)
}

async function deleteSupplier(supplier_id) {
	return await SupplierRepository.deleteSupplier(supplier_id)
}

async function disableEnableSupplier(supplier) {
	return await SupplierRepository.disableEnableSupplier(supplier)
}

export default {
	createSupplier,
	updateSupplier,
	getAllSupplier,
	getSupplier,
	deleteSupplier,
	disableEnableSupplier,
}
