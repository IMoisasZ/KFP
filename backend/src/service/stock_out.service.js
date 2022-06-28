import StockOutRepository from '../repository/stock_out.repository.js'

async function createStockOut(stockOut) {
  return await StockOutRepository.createStockOut(stockOut)
}

async function updateStockOut(stockOut) {
  return await StockOutRepository.updateStockOut(stockOut)
}

async function getAllStockOut() {
  return await StockOutRepository.getAllStockOut()
}

async function getStockOut(stock_out_id) {
  return await StockOutRepository.getStockOut(stock_out_id)
}

async function deleteStockOut(stock_out_id) {
  return await StockOutRepository.deleteStockOut(stock_out_id)
}

export default {
  createStockOut,
  updateStockOut,
  getAllStockOut,
  getStockOut,
  deleteStockOut,
}
