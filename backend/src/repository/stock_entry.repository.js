import StockEntryModel from '../model/stock_entry.model.js'
import ClientModel from '../model/client.model.js'
import SupplierModel from '../model/supplier.model.js'
import ProductModel from '../model/product.model.js'

async function createStockEntry(stockEntry) {
	const newStockEntry = await StockEntryModel.create(stockEntry)
	return await getStockEntry(newStockEntry.stock_entry_id)
}

async function updateStockEntry(stockEntry) {
	await StockEntryModel.update(stockEntry, {
		where: {
			stock_entry_id: stockEntry.stock_entry_id,
		},
	})
	return await getStockEntry(stockEntry.stock_entry_id)
}

async function getAllStockEntries() {
	return await StockEntryModel.findAll({
		include: [
			{
				model: ClientModel,
			},
			{
				model: SupplierModel,
			},
			{
				model: ProductModel,
			},
		],
	})
}

async function getStockEntry(stockEntryId) {
	return await StockEntryModel.findByPk(stockEntryId, {
		include: [
			{
				model: ClientModel,
			},
			{
				model: SupplierModel,
			},
			{
				model: ProductModel,
			},
		],
	})
}

async function deleteStockEntry(stockEntryId) {
	await StockEntryModel.destroy({
		where: {
			stock_entry_id: stockEntryId,
		},
	})
}

export default {
	createStockEntry,
	updateStockEntry,
	getAllStockEntries,
	getStockEntry,
	deleteStockEntry,
}
