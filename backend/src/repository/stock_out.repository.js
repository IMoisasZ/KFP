import StockOutModel from '../model/stock_out.model.js'
import ProductModel from '../model/product.model.js'
import TechnicianModel from '../model/technician.model.js'

async function createStockOut(stockOut) {
  try {
    const newStockOut = await StockOutModel.create(stockOut)
    return await getStockOut(newStockOut.stock_out_id)
  } catch (error) {
    throw error
  }
}

async function updateStockOut(stockOut) {
  try {
    await StockOutModel.update(stockOut, {
      where: {
        stock_out_id: stockOut.stock_out_id,
      },
    })
    return await getStockOut(stockOut.stock_out_id)
  } catch (error) {
    throw error
  }
}

async function getAllStockOut() {
  try {
    return await StockOutModel.findAll({
      include: [
        {
          model: ProductModel,
        },
        {
          model: TechnicianModel,
        },
      ],
    })
  } catch (error) {
    throw error
  }
}

async function getStockOut(stock_out_id) {
  try {
    return await StockOutModel.findByPk(stock_out_id, {
      include: [
        {
          model: ProductModel,
        },
        {
          model: TechnicianModel,
        },
      ],
    })
  } catch (error) {
    throw error
  }
}

async function deleteStockOut(stock_out_id) {
  try {
    return await StockOutModel.destroy({
      where: {
        stock_out_id,
      },
    })
  } catch (error) {
    throw error
  }
}

export default {
  createStockOut,
  updateStockOut,
  getAllStockOut,
  getStockOut,
  deleteStockOut,
}
