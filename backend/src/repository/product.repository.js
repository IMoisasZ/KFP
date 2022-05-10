import ProductModel from '../model/product.model.js'
import UnityModel from '../model/unity.model.js'

async function createProduct(product) {
	try {
		const newProduct = await ProductModel.create(product)
		return await getProduct(newProduct.product_id)
	} catch (error) {
		throw error
	}
}

async function updateProduct(product) {
	try {
		await ProductModel.update(product, {
			where: {
				product_id: product.product_id,
			},
		})

		return await getProduct(product.product_id)
	} catch (error) {
		throw error
	}
}

async function getProducts() {
	try {
		return await ProductModel.findAll({
			include: [
				{
					model: UnityModel,
				},
			],
		})
	} catch (error) {
		throw error
	}
}

async function getProduct(product_id) {
	try {
		return await ProductModel.findByPk(product_id, {
			include: [
				{
					model: UnityModel,
				},
			],
		})
	} catch (error) {
		throw error
	}
}

async function deleteProduct(product_id) {
	try {
		return await ProductModel.destroy({
			where: {
				product_id,
			},
		})
	} catch (error) {
		throw error
	}
}

async function disableEnableProduct(product) {
	try {
		await ProductModel.update(
			{
				actived: product.actived,
			},
			{
				where: {
					product_id: product.product_id,
				},
			},
		)
		return await getProduct(product.product_id)
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
