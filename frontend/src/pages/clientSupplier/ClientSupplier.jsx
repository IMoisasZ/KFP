import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/container/MyContainer'
import Form from '../../components/form/MyForm'
import Input from '../../components/input/MyInput'
import Select from '../../components/select/MySelect'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/MyMessage'
import ClientSupplierTable from './ClientSupplierTable'
import api from '../../api/api'
import style from './ClientSupplier.module.css'
import timeMessage from '../../utils/timeMessage.util'

function ClientSupplier() {
	// useState
	const [id, setId] = useState('')
	const [type, setType] = useState('')
	const [name, setName] = useState('')
	const [actived, setActived] = useState(true)
	const [message, setMessage] = useState('')
	const [typeMessage, setTypeMessage] = useState('')
	const [typeBtn, setTypeBtn] = useState('add')
	const [screen, setScreen] = useState('create')
	const [editClientSupplier, setEditClientSupplier] = useState('')

	// edit unity
	useEffect(() => {
		setId(editClientSupplier.client_supplier_id)
		setType(editClientSupplier.type)
		setName(editClientSupplier.name)
		setMessage(editClientSupplier.actived)
	}, [editClientSupplier])

	const handleType = (e) => {
		setType(e.target.value)
	}

	const togleActived = () => {
		setActived(!actived)
	}

	const handleClear = async () => {
		setId('')
		setType('')
		setName('')
		setActived(true)
		setTypeBtn('add')
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (typeBtn === 'add') {
			try {
				const newClientSupplier = {
					type,
					name,
					actived,
				}
				await api.post('/client_supplier', newClientSupplier)

				setTypeMessage('success')
				{
					type === 1
						? setMessage('Cliente cadastrado com sucesso!')
						: setMessage('Fornecedor cadastrado com sucesso!')
				}

				timeMessage(setTypeMessage, setMessage)

				handleClear()
			} catch (error) {
				console.log({ error })
				setTypeMessage('error')
				setMessage(error.response.data.error || error.response.data.erros)
				timeMessage(setTypeMessage, setMessage)
			}
		} else {
			try {
				const edit = {
					client_supplier_id: id,
					type,
					name,
					actived,
				}
				await api.patch('/product', edit)

				setTypeMessage('success')
				{
					type === 1
						? setMessage('Cliente editado com sucesso!')
						: setMessage('Fornecedor editado com sucesso!')
				}

				timeMessage(setTypeMessage, setMessage)
				handleClear()
			} catch (error) {
				console.log({ error })
				setTypeMessage('error')
				setMessage(error.response.data.error || error.response.data.erros)
				timeMessage(setTypeMessage, setMessage)
			}
		}
	}

	if (screen === 'create') {
		return (
			<Container minHeight='75vh' backgroundColor='main'>
				<div className={style.container_client_supplier}>
					<Link to='/menu'>
						<Button typeImage='home' title='Voltar ao menu' />
					</Link>
					<h2>Cliente / Fornecedor</h2>
					<Form handleOnSubmit={handleSubmit}>
						<Select
							name='type'
							value={type}
							defaultValue='Cliente ou Fornecedor?'
							labelSelect='Cliente / Fornecedor'
							handleOnChange={handleType}
							height='2.3em'
							divWidth='30%'>
							<option value={1}>Cliente</option>
							<option value={2}>Forneedor</option>
						</Select>
						<Input
							name='name'
							type='text'
							handleOnChange={(e) => setName(e.currentTarget.value)}
							value={name}
							nameLabel='Nome'
							placeholder='Digite o cliente ou fornecedor'
							divWidth='35%'
						/>
						<CheckBox
							name='actived'
							value={actived}
							checked={actived && true}
							nameLabel='Ativo'
							togleOnChange={togleActived}
							flexDirection='column'
							margin='0 2% 1% 0%'
							divWidth='5%'
						/>
						{typeBtn === 'add' ? (
							<div className={style.div_buttons}>
								<Button
									name='btn_incluir'
									typeImage={typeBtn}
									width='4em'
									height='4em'
									type='submit'
									title={
										typeBtn === 'add'
											? 'Incluir cliente/fornecedor!'
											: 'Editar cliente/fornecedor!'
									}
								/>

								<Button
									name='btn_list_client_supplier'
									typeImage='list'
									width='4em'
									height='4em'
									title='Lista de cliente/fornecedor'
									handleOnClick={() => setScreen('edit')}
								/>
							</div>
						) : (
							<div className={style.div_buttons}>
								<Button
									name='btn_incluir'
									typeImage={typeBtn}
									width='4em'
									height='4em'
									type='submit'
									title={
										typeBtn === 'add'
											? 'Incluir cliente/fornecedor!'
											: 'Editar cliente/fornecedor!'
									}
								/>

								<Button
									name='btn_list_client_supplier'
									typeImage='list'
									width='4em'
									height='4em'
									title='Lista de cliente/fornecedor'
									handleOnClick={() => setScreen('edit')}
								/>

								<Button
									name='btn_new'
									typeImage='new'
									width='4em'
									height='4em'
									title='Limpar Campos!'
									handleOnClick={() => handleClear()}
								/>
							</div>
						)}
					</Form>
					{message ? (
						<Message width='53%' margin='0 0 1em 0' typeMesssage={typeMessage}>
							{message}
						</Message>
					) : (
						''
					)}
				</div>
			</Container>
		)
	} else {
		return (
			<ClientSupplierTable
				screen={setScreen}
				clientSupplierEdit={setEditClientSupplier}
				btn={setTypeBtn}
			/>
		)
	}
}

export default ClientSupplier
