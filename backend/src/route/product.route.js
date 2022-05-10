import express from 'express'
import ProductController from '../controller/product.controller.js'

const route = express.Router()

route.post('/', ProductController.createProduct)
route.patch('/', ProductController.updateProduct)
route.get('/', ProductController.getProducts)
route.get('/:product_id', ProductController.getProduct)
route.delete('/:product_id', ProductController.deleteProduct)
route.put('/', ProductController.disableEnableProduct)

export default route
