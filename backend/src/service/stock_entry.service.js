import StockEntryRepository from '../repository/stock_entry.repository.js'
import StockActualRepository from '../repository/stock_actual.repository.js'
import dateFormat from '../util/dateFormat.util.js'
import StockActual from '../model/stock_actual.model.js'

async function createStockEntry(stockEntry) {
	try {
		stockEntry.date = dateFormat(stockEntry.date)
		const newStockEntry = await StockEntryRepository.createStockEntry(stockEntry)

		const productStockActual = await StockActualRepository.getStockActualByProduct(stockEntry.product_id)
		
		const average = await StockEntryRepository.getAverageStockEntryByProduct(stockEntry.product_id)
		const sum = await StockEntryRepository.getSumStockEntryByProduct(stockEntry.product_id)

		const stockActual = {
			id: productStockActual.id,
			product_id: stockEntry.product_id,
			actual_stock: sum[0].stock_actual,
			average_cost: average[0].average_cost
		}
		StockActualRepository.updateStockActual(stockActual)
		return newStockEntry

	} catch (error) {
		throw error
	}
}

async function updateStockEntry(stockEntry) {
	try {
		return await StockEntryRepository.updateStockEntry(stockEntry)
	} catch (error) {
		throw error
	}
}

async function getAllStockEntries() {
	try {
		return await StockEntryRepository.getAllStockEntries()
	} catch (error) {
		throw error
	}
}

async function getStockEntry(stockEntryId) {
	try {
		return await StockEntryRepository.getStockEntry(stockEntryId)
	} catch (error) {
		throw error
	}
}

async function deleteStockEntry(stockEntryId) {
	try {
		return await StockEntryRepository.deleteStockEntry(stockEntryId)
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
}
