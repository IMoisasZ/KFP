import ProductRepository from '../repository/product.repository.js'
import StockActualRepository from '../repository/stock_actual.repository.js'

async function createProduct(product) {
	try {
		product.description = product.description.toUpperCase()
		const newProduct = await ProductRepository.createProduct(product)
		const stock = {
			product_id: newProduct.product_id,
			actual_stock: 0.00,
			average_cost: 0.00,
		}
		StockActualRepository.createStockActual(stock)
		return newProduct
	} catch (error) {
		throw error
	}
}

async function updateProduct(product) {
	try {
		product.description = product.description.toUpperCase()
		return await ProductRepository.updateProduct(product)
	} catch (error) {
		throw error
	}
}

async function getProducts() {
	try {
		return await ProductRepository.getProducts()
	} catch (error) {
		throw error
	}
}

async function getProduct(product_id) {
	try {
		return await ProductRepository.getProduct(product_id)
	} catch (error) {
		throw error
	}
}

async function deleteProduct(product_id) {
	try {
		return await ProductRepository.deleteProduct(product_id)
	} catch (error) {
		throw error
	}
}

async function disableEnableProduct(product) {
	try {
		return await ProductRepository.disableEnableProduct(product)
	} catch (error) {
		throw error
	}
}

export default {
	createProduct,
	updateProduct,
	getProducts,
	getProduct,
	deleteProduct,
	disableEnableProduct,
}
