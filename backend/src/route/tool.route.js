import express from 'express'
import ToolController from '../controller/tool.controller.js'

const route = express.Router()

route.post('/', ToolController.createTool)
route.patch('/', ToolController.updateTool)
route.get('/?', ToolController.getAllTools)
route.get('/:tool_id', ToolController.getTool)
route.delete('/:tool_id', ToolController.deleteTool)
route.put('/', ToolController.disableEnableTool)

export default route
