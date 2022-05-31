import express from 'express'
import ToolListController from '../controller/tool_list.controller.js'

const route = express.Router()

route.post('/', ToolListController.createToolList)
route.patch('/', ToolListController.updateToolList)
route.get(
	'/all_tools_technician/:technician_id',
	ToolListController.getAllToolList,
)
route.get('/list_id/:tool_list_id', ToolListController.getToolList)
route.delete('/:tool_list_id', ToolListController.deleteToolList)

export default route
