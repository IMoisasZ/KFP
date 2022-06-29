import StockActualRepository from "../repository/stock_actual.repository.js";

async function createStockActual(StockActual){
    return await StockActualRepository.createStockActual(StockActual)
}

async function updateStockActual(stockActual){
    return await StockActualRepository.updateStockActual(stockActual)
}

async function getAllStockActual(){
    return await StockActualRepository.getAllStockActual()
}

async function getStockActual(id){
    return await StockActualRepository.getStockActual(id)
}

export default {
    createStockActual,
    updateStockActual,
    getAllStockActual,
    getStockActual
}