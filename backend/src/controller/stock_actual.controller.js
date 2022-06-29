import StockActualService from "../service/stock_actual.service.js";

async function createStockActual(req, res, next){
    try {
        const stockActual = req.body
        if(!stockActual.product_id){
            return res.status(400).json({error: 'O produto deve ser informado!'})
        }
        if(!stockActual.actual_stock){
            return res.status(400).json({error: 'A quantidade atual do estoque deve ser informada!'})
        }
        if(!stockActual.average_cost){
            return res.status(400).json({error: 'O custo médio do produto deve ser informado!'})
        }
        res.send(await StockActualService.createStockActual(stockActual))
        logger.info(`POST - /stock_actual - ${JSON.stringify(stockActual)}`)
    } catch (error) {
        next(error)
    }
}

async function updateStockActual(req, res, next){
    try {
        const stockActual = req.body
        if(!stockActual.product_id){
            return res.status(400).json({error: 'O produto deve ser informado!'})
        }
        if(!stockActual.actual_stock){
            return res.status(400).json({error: 'A quantidade atual do estoque deve ser informada!'})
        }
        if(!stockActual.average_cost){
            return res.status(400).json({error: 'O custo médio do produto deve ser informado!'})
        }
        res.send(await StockActualService.updateStockActual(stockActual))
        logger.info(`PATCH - /stock_actual - ${JSON.stringify(stockActual)}`)
    } catch (error) {
        next(error)
    }
}

async function getAllStockActual(req, res, next){
    try {
        res.send(await StockActualService.getAllStockActual())
        logger.info(`GET - /stock_actual - ALL PRODUCTS WITH YOUR ACTUAL STOCK!`)
    } catch (error) {
        next(error)
    }
}

async function getStockActual(req, res, next){
    try {
        res.send(await StockActualService.getStockActual(req.params.id))
        logger.info(`GET - /stock_actual/:${req.params.id}`)
    } catch (error) {
        next(error)
    }
}

export default {
    createStockActual,
    updateStockActual,
    getAllStockActual,
    getStockActual
}