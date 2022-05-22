import express from 'express'
import SupplierController from '../controller/supplier.controller.js'

const route = express.Router()

route.post('/', SupplierController.createSupplier)
route.patch('/', SupplierController.updateSupplier)
route.get('/?', SupplierController.getAllSupplier)
route.get('/:supplier_id', SupplierController.getSupplier)
route.delete('/:supplier_id', SupplierController.deleteSupplier)
route.put('/', SupplierController.disableEnableSupplier)

export default route
