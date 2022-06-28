import React, { useState, useEffect } from 'react'
import Container from '../../components/container/MyContainer'
import Table from '../../components/table/MyTable'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/MyMessage'
import style from './ToolTable.module.css'
import api from '../../api/api'
import timeMessage from '../../utils/timeMessage.util'

function UnityTable({ screen, toolEdit, btn }) {
	// useState
	const [listTools, setListTools] = useState([])
	const [message, setMessage] = useState('')
	const [typeMessage, setTypeMessage] = useState('')

	// show all units
	const allTools = async () => {
		const result = await (await api.get('/tool?tool_status')).data
		setListTools(result)
	}

	useEffect(() => {
		const loadTools = async () => {
			await allTools()
		}
		loadTools()
	}, [])

	// header the table
	const headTable = ['Descriçao', 'Ativo', 'Ações']

	// disable or enable the tool
	const togleDisableEnable = async (tool_id, tool_actived) => {
		await api.put(`/tool`, {
			tool_id,
			actived: !tool_actived,
		})
		await allTools()
	}

	// delete tool
	const handleDelete = async (tool_id) => {
		try {
			const result = await api.delete(`/tool/${tool_id}`)
			await allTools()
			setTypeMessage('success')
			setMessage(result.data.msg)
			timeMessage(setMessage, setTypeMessage)
		} catch (error) {
			console.log({ error })
			setTypeMessage('error')
			setMessage(error.response.data.error || error.response.data.erros)
			timeMessage(setMessage, setTypeMessage)
		}
	}

	// edit tool
	const handleEditTool = (tool) => {
		screen('create')
		toolEdit(tool)
		btn('edit')
	}

	return (
		<Container height='70vh' backgroundColor='main'>
			<div className={style.container_table}>
				<Button
					margin='1em 0 0 0'
					typeImage='back'
					title='Voltar ao cadastro de ferramentas'
					handleOnClick={() => screen('create')}
				/>

				<h1>Lista de Ferramentas</h1>
				<Message typeMesssage={typeMessage} width='92.6%' margin='0 0 1em 0'>
					{message}
				</Message>
				{listTools.length > 0 ? (
					<div className={style.table}>
						<Table headTable={headTable}>
							{listTools.map((tool) => {
								return (
									<tr key={tool.tool_id}>
										<td>{tool.description}</td>
										<td>{tool.actived ? 'Sim' : 'Não'}</td>
										<td>
											<Button
												typeImage='edit'
												color='orange'
												backgroundColor='transparent'
												title={`Editar a ferramenta ${tool.description}`}
												handleOnClick={() => handleEditTool(tool)}
											/>
										</td>
										<td>
											{tool.actived ? (
												<Button
													typeImage='enable'
													color='darkGreen'
													backgroundColor='transparent'
													title={`Desativar ferramenta ${tool.description}`}
													handleOnClick={() =>
														togleDisableEnable(tool.tool_id, tool.actived)
													}
												/>
											) : (
												<Button
													typeImage='disable'
													color='darkRed'
													backgroundColor='transparent'
													title={`Ativar ferramenta ${tool.description}`}
													handleOnClick={() =>
														togleDisableEnable(tool.tool_id, tool.actived)
													}
												/>
											)}
										</td>
										<td>
											<Button
												typeImage='del'
												color='darkRed'
												backgroundColor='transparent'
												title={`Excluir a ferramenta ${tool.description}`}
												handleOnClick={() => handleDelete(tool.tool_id)}
											/>
										</td>
									</tr>
								)
							})}
						</Table>
					</div>
				) : (
					<p>Não há ferramentas cadastradas!</p>
				)}
			</div>
		</Container>
	)
}

export default UnityTable
