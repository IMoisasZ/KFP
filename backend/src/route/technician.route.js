import express from 'express'
import TechnicianController from '../controller/technician.controller.js'

const route = express.Router()

route.post('/', TechnicianController.createTechnician)
route.patch('/', TechnicianController.updateTechnician)
route.get('/?', TechnicianController.getAllTechnicians)
route.get('/:technician_id', TechnicianController.getTechnician)
route.delete('/:technician_id', TechnicianController.deleteTechnician)
route.put('/', TechnicianController.disableEnableTechnician)

export default route
