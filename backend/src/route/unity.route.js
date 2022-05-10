import express from 'express'
import UnityController from '../controller/unity.controller.js'

const route = express.Router()

route.post('/', UnityController.createUnity)
route.patch('/', UnityController.updateUnity)
route.get('/', UnityController.getUnits)
route.get('/:unity_id', UnityController.getUnity)
route.delete('/:unity_id', UnityController.deleteUnity)
route.put('/', UnityController.disableEnableUnity)

export default route
