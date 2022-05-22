import SupplierModel from '../model/supplier.model.js'

async function createSupplier(supplier) {
	try {
		const newSuplier = await SupplierModel.create(supplier)
		return await getSupplier(newSuplier.supplier_id)
	} catch (error) {
		console.log({ error })
		throw new Error('Fornecedor já cadastrado!')
	}
}

async function updateSupplier(supplier) {
	try {
		await SupplierModel.update(supplier, {
			where: {
				supplier_id: supplier.supplier_id,
			},
		})
		return await getSupplier(supplier.supplier_id)
	} catch (error) {
		throw new Error('Fornecedor já cadastrado!')
	}
}

async function getAllSupplier(supplierStatus) {
	try {
		if (supplierStatus === true || supplierStatus === false) {
			return await SupplierModel.findAll({
				where: {
					actived: supplierStatus,
				},
			})
		} else if (supplierStatus === undefined) {
			return await SupplierModel.findAll()
		}
	} catch (error) {
		throw error
	}
}

async function getAllSupplierStatus(supplierStatus) {
	try {
		return await SupplierModel.findAll({
			where: {
				actived: supplierStatus,
			},
		})
	} catch (error) {
		throw error
	}
}

async function getSupplier(supplier_id) {
	try {
		return await SupplierModel.findByPk(supplier_id)
	} catch (error) {
		throw error
	}
}

async function deleteSupplier(supplier_id) {
	try {
		return await SupplierModel.destroy({
			where: {
				supplier_id,
			},
		})
	} catch (error) {
		throw error
	}
}

async function disableEnableSupplier(supplier) {
	console.debug('repository', supplier)
	try {
		await SupplierModel.update(
			{
				actived: supplier.actived,
			},
			{
				where: {
					supplier_id: supplier.supplier_id,
				},
			},
		)
		return await getSupplier(supplier.supplier_id)
	} catch (error) {
		throw error
	}
}

export default {
	createSupplier,
	updateSupplier,
	getAllSupplier,
	getAllSupplierStatus,
	getSupplier,
	deleteSupplier,
	disableEnableSupplier,
}
