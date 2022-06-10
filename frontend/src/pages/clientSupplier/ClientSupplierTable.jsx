import React, { useState, useEffect } from 'react'
import Container from '../../components/container/MyContainer'
import Table from '../../components/table/MyTable'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/MyMessage'
import Select from '../../components/select/MySelect'
import style from './ClientSupplierTable.module.css'
import api from '../../api/api'
import timeMessage from '../../utils/timeMessage.util'

function ClientSupplierTable({
	screen,
	clientSupplierEdit,
	btn,
	typeEdit,
	disableSelect,
}) {
	// useState
	const [listClientSupplier, setListClientSupplier] = useState([])
	const [message, setMessage] = useState('')
	const [typeMessage, setTypeMessage] = useState('')
	const [type, setType] = useState('')

	// show all clients
	const allClients = async () => {
		const result = await api.get(`/client?client_status`)
		setListClientSupplier(result.data)
	}

	// show all suppliers
	const allSuppliers = async () => {
		const result = await api.get(`/supplier?supplier_status`)
		setListClientSupplier(result.data)
	}

	useEffect(() => {
		if (type === '1') {
			const loadClients = async () => {
				await allClients()
			}
			loadClients()
		} else if (type === '2') {
			const loadSuppliers = async () => {
				await allSuppliers()
			}
			loadSuppliers()
		}
	}, [type])

	// header the table
	const headTable = ['Nome', 'Ativo', 'Ações']

	// disable or enable the clients or suppliers
	const togleDisableEnable = async (client_supplier_id, actived) => {
		if (type === '1') {
			await api.put(`/client`, {
				client_id: client_supplier_id,
				actived: !actived,
			})
			await allClients()
		} else if (type === '2') {
			await api.put(`/supplier`, {
				supplier_id: client_supplier_id,
				actived: !actived,
			})
			await allSuppliers()
		}
	}

	// delete unity
	const handleDelete = async (client_supplier_id) => {
		switch (type) {
			case '1':
				try {
					const result = await api.delete(`/client/${client_supplier_id}`)
					await allClients()
					setTypeMessage('success')
					setMessage(result.data.msg)
					timeMessage(setMessage, setTypeMessage)
				} catch (error) {
					console.log({ error })
					setTypeMessage('error')
					setMessage(error.response.data.error || error.response.data.erros)
					timeMessage(setMessage, setTypeMessage)
				}
				break
			case '2':
				try {
					const result = await api.delete(`/supplier/${client_supplier_id}`)
					await allSuppliers()
					setTypeMessage('success')
					setMessage(result.data.msg)
					timeMessage(setMessage, setTypeMessage)
				} catch (error) {
					console.log({ error })
					setTypeMessage('error')
					setMessage(error.response.data.error || error.response.data.erros)
					timeMessage(setMessage, setTypeMessage)
				}
				break

			default:
				break
		}
	}

	// edit client/supplier
	const handleEditClientSupplier = (clientSupplier) => {
		screen('create')
		clientSupplierEdit(clientSupplier)
		btn('edit')
		typeEdit(type)
		disableSelect(true)
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
				<Select
					name='type'
					value={type}
					defaultValue='selecione uma opção...'
					labelSelect='Cliente / Fornecedor'
					handleOnChange={(e) => setType(e.target.value)}
					height='2.3em'
					margin='0'
					divWidth='20%'
					width='100%'>
					<option value={1}>Cliente</option>
					<option value={2}>Fornecedor</option>
				</Select>
				<Message typeMesssage={typeMessage} width='92.6%' margin='0 0 1em 0'>
					{message}
				</Message>
				{type === '1' &&
					(listClientSupplier.length > 0 ? (
						<div className={style.table}>
							<Table headTable={headTable}>
								{listClientSupplier.map((client) => {
									return (
										<tr key={client.client_id}>
											<td>{client.name}</td>
											<td>{client.actived ? 'Sim' : 'Não'}</td>
											<td>
												<Button
													typeImage='edit'
													color='orange'
													backgroundColor='transparent'
													title={`Editar o cliente ${client.name}`}
													handleOnClick={() => handleEditClientSupplier(client)}
												/>
											</td>
											<td>
												{client.actived ? (
													<Button
														typeImage='enable'
														color='darkGreen'
														backgroundColor='transparent'
														title={`Desativar o cliente ${client.name}`}
														handleOnClick={() =>
															togleDisableEnable(
																client.client_id,
																client.actived,
															)
														}
													/>
												) : (
													<Button
														typeImage='disable'
														color='darkRed'
														backgroundColor='transparent'
														title={`Ativar cliente ${client.name}`}
														handleOnClick={() =>
															togleDisableEnable(
																client.client_id,
																client.actived,
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
													title={`Excluir o cliente ${client.name}`}
													handleOnClick={() => handleDelete(client.client_id)}
												/>
											</td>
										</tr>
									)
								})}
							</Table>
						</div>
					) : (
						<p>Não há clientes cadastrados!</p>
					))}
				{type === '2' &&
					(listClientSupplier.length > 0 ? (
						<div className={style.table}>
							<Table headTable={headTable}>
								{listClientSupplier.map((supplier) => {
									return (
										<tr key={supplier.supplier_id}>
											<td>{supplier.name}</td>
											<td>{supplier.actived ? 'Sim' : 'Não'}</td>
											<td>
												<Button
													typeImage='edit'
													color='orange'
													backgroundColor='transparent'
													title={`Editar o fornecedor ${supplier.name}`}
													handleOnClick={() =>
														handleEditClientSupplier(supplier)
													}
												/>
											</td>
											<td>
												{supplier.actived ? (
													<Button
														typeImage='enable'
														color='darkGreen'
														backgroundColor='transparent'
														title={`Desativar o fornecedor ${supplier.name}`}
														handleOnClick={() =>
															togleDisableEnable(
																supplier.supplier_id,
																supplier.actived,
															)
														}
													/>
												) : (
													<Button
														typeImage='disable'
														color='darkRed'
														backgroundColor='transparent'
														title={`Ativar cliente ${supplier.name}`}
														handleOnClick={() =>
															togleDisableEnable(
																supplier.supplier_id,
																supplier.actived,
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
													title={`Excluir o fornecedor ${supplier.name}`}
													handleOnClick={() =>
														handleDelete(supplier.supplier_id)
													}
												/>
											</td>
										</tr>
									)
								})}
							</Table>
						</div>
					) : (
						<p>Não há fornecedores cadastrados!</p>
					))}
			</div>
		</Container>
	)
}

export default ClientSupplierTable
