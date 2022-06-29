import StockActualModel from "../model/stock_actual.model.js";
import ProductModel from "../model/product.model.js";

// insert the new product with the average cost zero and actual stock zero
async function createStockActual(stockActual){
    try {
        const newStockActual = await StockActualModel.create(stockActual)
        return await getStockActual(newStockActual.id)
    } catch (error) {
        throw error
    }
}

// updated the average cost and/or actual stock
async function updateStockActual(stockActual){
    try {
        await StockActualModel.update(stockActual,{
            where: {
                id: stockActual.id
            }
        })
        return await getStockActual(stockActual.id)
    } catch (error) {
        throw error
    }
}  

// show all data about all products references actual stock
async function getAllStockActual(){
    try {
        return await StockActualModel.findAll({
            include:[
                {
                    model: ProductModel
                }
            ]
        })
    } catch (error) {
        throw error
    }
}

// show a specific sotck actual about a uique product
async function getStockActual(id){
    try {
        return await StockActualModel.findByPk(id,{
            include:[
                {
                    model: ProductModel
                }
            ]
        })
    } catch (error) {
        throw error
    }
}

// get a stok actual by product_id
async function getStockActualByProduct(product_id){
    try {
        return await StockActualModel.findOne({
            where: {
                product_id
            }
        })     
    } catch (error) {
        throw error
    }
}

export default {
    createStockActual,
    updateStockActual,
    getAllStockActual,
    getStockActual,
    getStockActualByProduct
}