import StockOutService from '../service/stock_out.service.js'

async function createStockOut(req, res, next) {
  try {
    const stockOut = req.body
    if (!stockOut.date) {
      return res.status(400).json({ error: 'A data deve ser informada!' })
    }
    if (!stockOut.product_id) {
      return res.status(400).json({ error: 'O produto deve ser informado!' })
    }
    if (!stockOut.technician_id) {
      return res.status(400).json({ error: 'O técnico deve ser informado!' })
    }
    if (!stockOut.quantity) {
      return res.status(400).json({ error: 'A quantidade deve ser informada!' })
    }
    res.send(await StockOutService.createStockOut(stockOut))
    logger.info(`POST - /stock_out - ${JSON.stringify(stockOut)}`)
  } catch (error) {
    next(error)
  }
}

async function updateStockOut(req, res, next) {
  try {
    const stockOut = req.body
    if (!stockOut.date) {
      return res.status(400).json({ error: 'A data deve ser informada!' })
    }
    if (!stockOut.product_id) {
      return res.status(400).json({ error: 'O produto deve ser informado!' })
    }
    if (!stockOut.technician_id) {
      return res.status(400).json({ error: 'O técnico deve ser informado!' })
    }
    if (!stockOut.quantity) {
      return res.status(400).json({ error: 'A quantidade deve ser informada!' })
    }
    res.send(await StockOutService.updateStockOut(stockOut))
    logger.info(`PATCH - /stock_out - ${JSON.stringify(stockOut)}`)
  } catch (error) {
    next(error)
  }
}

async function getAllStockOut(req, res, next) {
  try {
    res.send(await StockOutService.getAllStockOut())
    logger.info(`GET - /stock_out - ALL STOCK OUT`)
  } catch (error) {
    next(error)
  }
}

async function getStockOut(req, res, next) {
  try {
    res.send(await StockOutService.getStockOut(req.params.stock_out_id))
    logger.info(`GET - /stock_out/:${req.params.stock_out_id}`)
  } catch (error) {
    next(error)
  }
}

async function deleteStockOut(req, res, next) {
  try {
    await StockOutService.deleteStockOut(req.params.stock_out_id)
    res.status(200).json({ message: 'Saída de estoque excluida com sucesso!' })
    logger.info(`DELETE - /stock_out/:${req.params.stock_out_id}`)
  } catch (error) {
    next(error)
  }
}

export default {
  createStockOut,
  updateStockOut,
  getAllStockOut,
  getStockOut,
  deleteStockOut,
}
