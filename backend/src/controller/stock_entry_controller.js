import StockEntryService from '../service/stock_entry.service.js'

async function createStockEntry(req, res, next) {
	try {
		const stockEntry = req.body
		if (!stockEntry.date) {
			return res.status(400).json({ error: 'A data é obrigatória' })
		}
		if (!stockEntry.product_id) {
			return res.status(400).json({ error: 'O produto é obrigatório' })
		}
		if (!stockEntry.quantity) {
			return res.status(400).json({ error: 'A quantidade é obrigatória' })
		}
		res.send(await StockEntryService.createStockEntry(stockEntry))
		logger.info(`POST - /stock_entry - ${JSON.stringify(stockEntry)}`)
	} catch (error) {
		next(error)
	}
}

async function updateStockEntry(req, res, next) {
	try {
		const stockEntry = req.body
		if (!stockEntry.date) {
			return res.status(400).json({ error: 'A data é obrigatória' })
		}
		if (!stockEntry.product_id) {
			return res.status(400).json({ error: 'O produto é obrigatório' })
		}
		if (!stockEntry.quantity) {
			return res.status(400).json({ error: 'A quantidade é obrigatória' })
		}
		res.send(await StockEntryService.updateStockEntry(stockEntry))
		logger.info(`PATCH - /stock_entry - ${JSON.stringify(stockEntry)}`)
	} catch (error) {
		next(error)
	}
}

async function getAllStockEntries(req, res, next) {
	try {
		res.send(await StockEntryService.getAllStockEntries())
		logger.info(`GET - /stock_entry - ALL STOCK ENTRIES`)
	} catch (error) {
		next(error)
	}
}

async function getStockEntry(req, res, next) {
	try {
		res.send(
			await StockEntryService.getAllStockEntries(req.params.stock_entry_id),
		)
		logger.info(`GET - /stock_entry/:${req.params.stock_entry_id}`)
	} catch (error) {
		next(error)
	}
}

async function deleteStockEntry(req, res, next) {
	try {
		await StockEntryService.deleteStockEntry(req.params.stock_entry_id)
		res.status(200).json({ message: 'Entrada de estoque excluida com sucesso' })
		logger.info(`DELETE - /stock_entry/:${req.params.stock_entry_id}`)
	} catch (error) {
		next(error)
	}
}

export default {
	createStockEntry,
	updateStockEntry,
	getAllStockEntries,
	getStockEntry,
	deleteStockEntry,
}
