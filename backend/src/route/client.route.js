import express from 'express'
import ClientController from '../controller/client.controller.js'

const route = express.Router()

route.post('/', ClientController.createClient)
route.patch('/', ClientController.updateClient)
route.get('/?', ClientController.getAllClient)
route.get('/:client_id', ClientController.getClient)
route.delete('/:client_id', ClientController.deleteClient)
route.put('/', ClientController.disableEnableClient)

export default route
