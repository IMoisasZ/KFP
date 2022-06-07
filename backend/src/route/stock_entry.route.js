import express from 'express'
import StockEntryController from '../controller/stock_entry_controller.js'

const route = express.Router()

route.post('/', StockEntryController.createStockEntry)
route.patch('/', StockEntryController.updateStockEntry)
route.get('/', StockEntryController.getAllStockEntries)
route.get('/:stock_entry_id', StockEntryController.getStockEntry)
route.delete('/:stock_entry_id', StockEntryController.deleteStockEntry)

export default route
