import StockEntryModel from '../model/stock_entry.model.js'
import ClientModel from '../model/client.model.js'
import SupplierModel from '../model/supplier.model.js'
import ProductModel from '../model/product.model.js'
import sequelize from 'sequelize'

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

async function getAverageStockEntryByProduct(product_id){
	try {
		return await StockEntryModel.findAll({
			where: {
				product_id,
				price:{
					[sequelize.Op.ne]:['0.00']
				}
			},
				attributes:[
					[sequelize.fn('avg', sequelize.col('price')), 'average_cost'],
				],

				raw:true

		})
	} catch (error) {
		throw error
	}
}

async function getSumStockEntryByProduct(product_id){
	try {
		return await StockEntryModel.findAll({
			where: {
				product_id,
			},
				attributes:[
					[sequelize.fn('sum', sequelize.col('quantity')), 'stock_actual_entry'],
				],

				raw:true

		})
	} catch (error) {
		throw error
	}
}


export default {
	createStockEntry,
	updateStockEntry,
	getAllStockEntries,
	getStockEntry,
	deleteStockEntry,
	getAverageStockEntryByProduct,
	getSumStockEntryByProduct
}
