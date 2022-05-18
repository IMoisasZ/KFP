import React, { useState, useEffect } from 'react'
import Container from '../../components/container/MyContainer'
import Table from '../../components/table/MyTable'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/MyMessage'
import style from './ClientSupplierTable.module.css'
import api from '../../api/api'
import timeMessage from '../../utils/timeMessage.util'

function ClientSupplierTable({ screen, clientSupplierEdit, btn }) {
	// useState
	const [listClientSupplier, setListClientSupplier] = useState([])
	const [message, setMessage] = useState('')
	const [typeMessage, setTypeMessage] = useState('')

	// show all units
	const allClientsSuppliers = async () => {
		const result = (await api.get('/client_supplier')).data
		setListClientSupplier(result)
	}

	useEffect(() => {
		const loadClientsSuppliers = async () => {
			await allClientsSuppliers()
		}
		loadClientsSuppliers()
	}, [])

	// header the table
	const headTable = ['Tipo', 'Nome', 'Ativo', 'Ações']

	// disable or enable the unity
	const togleDisableEnable = async (client_supplier_id, actived) => {
		await api.put(`/client_supplier`, {
			client_supplier_id,
			actived: !actived,
		})
		await allClientsSuppliers()
	}

	// delete unity
	const handleDelete = async (client_supplier_id) => {
		try {
			const result = await api.delete(`/client_supplier/${client_supplier_id}`)
			await allClientsSuppliers()
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

	// edit unity
	const handleEditClientSupplier = (clientSupplier) => {
		screen('create')
		clientSupplierEdit(clientSupplier)
		btn('edit')
	}

	return (
		<Container height='75vh' backgroundColor='main'>
			<div className={style.container_table}>
				<Button
					margin='1em 0 0 0'
					typeImage='back'
					title='Voltar ao cadastro de unidade'
					handleOnClick={() => screen('create')}
				/>

				<h1>Lista de Clientes / Fornecedores</h1>
				<Message typeMesssage={typeMessage} width='92.6%' margin='0 0 1em 0'>
					{message}
				</Message>
				{listClientSupplier.length > 0 ? (
					<div className={style.table}>
						<Table headTable={headTable}>
							{listClientSupplier.map((clientSupplier) => {
								return (
									<tr key={clientSupplier.client_supplier_id}>
										<td>
											{clientSupplier.type === 1 ? 'Cliente' : 'Fornecedor'}
										</td>
										<td>{clientSupplier.name}</td>
										<td>{clientSupplier.actived ? 'Sim' : 'Não'}</td>
										<td>
											<Button
												typeImage='edit'
												color='orange'
												backgroundColor='transparent'
												title={`Editar o cliente/fornecedor ${clientSupplier.name}`}
												handleOnClick={() =>
													handleEditClientSupplier(clientSupplier)
												}
											/>
										</td>
										<td>
											{clientSupplier.actived ? (
												<Button
													typeImage='enable'
													color='darkGreen'
													backgroundColor='transparent'
													title={
														clientSupplier.type === 1
															? `Desativar o cliente ${clientSupplier.name}`
															: `Desativar o fornecedor ${clientSupplier.name}`
													}
													handleOnClick={() =>
														togleDisableEnable(
															clientSupplier.client_supplier_id,
															clientSupplier.actived,
														)
													}
												/>
											) : (
												<Button
													typeImage='disable'
													color='darkRed'
													backgroundColor='transparent'
													title={
														clientSupplier.type === 1
															? `Ativar cliente ${clientSupplier.name}`
															: `Ativar fornecedor ${clientSupplier.name}`
													}
													handleOnClick={() =>
														togleDisableEnable(
															clientSupplier.client_supplier_id,
															clientSupplier.actived,
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
												title={
													clientSupplier.type === 1
														? `Excluir o cliente ${clientSupplier.name}`
														: `Excluir o fornecedor ${clientSupplier.name}`
												}
												handleOnClick={() =>
													handleDelete(clientSupplier.client_supplier_id)
												}
											/>
										</td>
									</tr>
								)
							})}
						</Table>
					</div>
				) : (
					<p>Não há clientes ou fornecedores cadastrados!</p>
				)}
			</div>
		</Container>
	)
}

export default ClientSupplierTable
