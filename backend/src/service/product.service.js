import ProductRepository from '../repository/product.repository.js'

async function createProduct(product) {
	try {
		product.description = product.description.toUpperCase()
		return await ProductRepository.createProduct(product)
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
