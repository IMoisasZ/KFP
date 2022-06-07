import StockEntryRepository from '../repository/stock_entry.repository.js'

async function createStockEntry(stockEntry) {
	try {
		return await StockEntryRepository.createStockEntry(stockEntry)
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
