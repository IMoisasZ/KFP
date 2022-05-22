import React, { useState, useEffect } from 'react'
import Container from '../../components/container/MyContainer'
import Table from '../../components/table/MyTable'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/MyMessage'
import style from './TechnicianTable.module.css'
import api from '../../api/api'
import timeMessage from '../../utils/timeMessage.util'
import formatDocument from '../../utils/formatDocuments.util'

function TechnicianTable({ screen, technicianEdit, btn }) {
	// useState
	const [listTechnician, setListTechnician] = useState([])
	const [message, setMessage] = useState('')
	const [typeMessage, setTypeMessage] = useState('')

	// show all technician
	const allTechnicians = async () => {
		const result = await (await api.get('/technician?technician_status')).data
		setListTechnician(result)
	}

	useEffect(() => {
		const loadTechnician = async () => {
			await allTechnicians()
		}
		loadTechnician()
	}, [])

	// header the table
	const headTable = ['Nome', 'RG', 'CPF', 'Veiculo', 'Placa', 'Ativo', 'Ações']

	// disable or enable the technician
	const togleDisableEnable = async (technician_id, actived) => {
		await api.put(`/technician`, {
			technician_id,
			actived: !actived,
		})
		await allTechnicians()
	}

	// delete technician
	const handleDelete = async (technician_id) => {
		try {
			const result = await api.delete(`/technician/${technician_id}`)
			await allTechnicians()
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
	const handleEditTechician = (technician) => {
		screen('create')
		technicianEdit(technician)
		btn('edit')
	}

	return (
		<Container height='75vh' backgroundColor='main'>
			<div className={style.container_table}>
				<Button
					margin='1em 0 0 0'
					typeImage='back'
					title='Voltar ao cadastro de técnicos'
					handleOnClick={() => screen('create')}
				/>

				<h1>Lista de Técnicos</h1>
				<Message typeMesssage={typeMessage} width='92.6%' margin='0 0 1em 0'>
					{message}
				</Message>
				{listTechnician.length > 0 ? (
					<div className={style.table}>
						<Table headTable={headTable}>
							{listTechnician.map((technician) => {
								return (
									<tr key={technician.technician_id}>
										<td>{`${technician.name} ${technician.last_name}`}</td>
										<td>{formatDocument(technician.rg, 'rg')}</td>
										<td>{formatDocument(technician.cpf, 'cpf')}</td>
										<td>{technician.car}</td>
										<td>{technician.plate}</td>
										<td>{technician.actived ? 'Sim' : 'Não'}</td>
										<td>
											<Button
												typeImage='edit'
												color='orange'
												backgroundColor='transparent'
												title={`Editar o técico ${technician.name}`}
												handleOnClick={() => handleEditTechician(technician)}
											/>
										</td>
										<td>
											{technician.actived ? (
												<Button
													typeImage='enable'
													color='darkGreen'
													backgroundColor='transparent'
													title={`Desativar técnico ${technician.name}`}
													handleOnClick={() =>
														togleDisableEnable(
															technician.technician_id,
															technician.actived,
														)
													}
												/>
											) : (
												<Button
													typeImage='disable'
													color='darkRed'
													backgroundColor='transparent'
													title={`Ativar técnico ${technician.name}`}
													handleOnClick={() =>
														togleDisableEnable(
															technician.technician_id,
															technician.actived,
														)
													}
												/>
											)}
										</td>
										<td>
											<Button
												typeImage='del'
												color='darkRed'
												backgroundColor='transparent'
												title={`Excluir o técnico ${technician.name}`}
												handleOnClick={() =>
													handleDelete(technician.technician_id)
												}
											/>
										</td>
									</tr>
								)
							})}
						</Table>
					</div>
				) : (
					<p>Não há técicos cadastrados!</p>
				)}
			</div>
		</Container>
	)
}

export default TechnicianTable
