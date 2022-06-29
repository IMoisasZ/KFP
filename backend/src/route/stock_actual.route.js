import express from 'express'
import StockActualController from '../controller/stock_actual.controller.js'

const route = express.Router()

route.post('/', StockActualController.createStockActual)
route.patch('/', StockActualController.updateStockActual)
route.get('/', StockActualController.getAllStockActual)
route.get('/:id', StockActualController.getStockActual)

export default route