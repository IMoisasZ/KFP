import express from 'express'
import StockOutController from '../controller/stock_out.controller.js'

const route = express.Router()

route.post('/', StockOutController.createStockOut)
route.patch('/', StockOutController.updateStockOut)
route.get('/', StockOutController.getAllStockOut)
route.get('/:stock_out_id', StockOutController.getStockOut)
route.delete('/:stock_out_id', StockOutController.deleteStockOut)

export default route
