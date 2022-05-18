import express from 'express'
import ClientSupplierController from '../controller/client_supplier.controller.js'

const route = express.Router()

route.post('/', ClientSupplierController.createClientSupplier)
route.patch('/', ClientSupplierController.updateClientSupplier)
route.get('/?', ClientSupplierController.getAllClientSupplier)
route.get('/:client_supplier_id', ClientSupplierController.getClientSupplier)
route.delete(
	'/:client_supplier_id',
	ClientSupplierController.deleteClientSupplier,
)
route.put('/', ClientSupplierController.disableEnableClientSupplier)

export default route
