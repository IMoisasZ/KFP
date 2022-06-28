import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/container/MyContainer'
import Form from '../../components/form/MyForm'
import Input from '../../components/input/MyInput'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Button from '../../components/button/MyButton'
import Select from '../../components/select/MySelect'
import Message from '../../components/message/MyMessage'
import TechnicianTable from './TechnicianTable'
import style from './Technician.module.css'
import api from '../../api/api'
import timeMessage from '../../utils/timeMessage.util'
import formatDocument from '../../utils/formatDocuments.util'

function Technician() {
	// data about technician
	const [name, setName] = useState('')
	const [lastName, setLastName] = useState('')
	const [rg, setRg] = useState('')
	const [cpf, setCpf] = useState('')
	const [car, setCar] = useState('')
	const [plate, setPlate] = useState('')
	const [systemUser, setSystemUser] = useState(false)
	const [roleId, setRoleId] = useState('')
	const [actived, setActived] = useState(true)
	const [screen, setScreen] = useState('create')
	const [editTechnician, setEditTechnician] = useState('')
	const [typeBtn, setTypeBtn] = useState('add')
	const [display, setDisplay] = useState('none')
	console.log(editTechnician)
	// edit technician
	useEffect(() => {
		setName(editTechnician.name)
		setLastName(editTechnician.last_name)
		setRg(editTechnician.rg)
		setCpf(editTechnician.cpf)
		setCar(editTechnician.car)
		setPlate(editTechnician.plate)
		setSystemUser(editTechnician.system_user)
		setRoleId(editTechnician.role_id)
		setActived(editTechnician.actived)
	}, [editTechnician])

	// roles temp
	const roles = [
		{
			role_id: 1,
			description: 'MASTER',
		},
		{
			role_id: 2,
			description: 'ADMIN',
		},
		{
			role_id: 3,
			description: 'USER',
		},
	]

	// message
	const [message, setMessage] = useState('')
	const [typeMessage, setTypeMessage] = useState('')

	// togle actived
	const togleActived = () => {
		setActived(!actived)
	}

	// togle systemUser
	const togleSystemUser = () => {
		setSystemUser(!systemUser)
	}

	// show role
	useEffect(() => {
		if (systemUser) {
			setDisplay('flex')
		} else {
			setDisplay('none')
		}
	}, [systemUser])

	// clear the form
	const handleClear = () => {
		setName('')
		setLastName('')
		setRg('')
		setCpf('')
		setCar('')
		setPlate('')
		setSystemUser(false)
		setRoleId('')
		setActived(true)
		setDisplay('none')
		setTypeBtn('add')
	}

	// submit
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (typeBtn === 'add') {
			try {
				const newTechnician = {
					name,
					last_name: lastName,
					rg,
					cpf,
					car,
					plate,
					system_user: systemUser,
					role_id: roleId,
					actived,
				}

				await api.post('/technician', newTechnician)
				setTypeMessage('success')
				setMessage('Técnico cadastrado com sucesso!')
				timeMessage(setMessage, setTypeMessage)
				handleClear()
			} catch (error) {
				console.error({ error })
				setTypeMessage('error')
				setMessage(error.response.data.error || error.response.data.erros)
				timeMessage(setMessage, setTypeMessage)
				handleClear()
			}
		} else {
			try {
				const edit = {
					technician_id: editTechnician.technician_id,
					name,
					last_name: lastName,
					rg,
					cpf,
					car,
					plate,
					system_user: systemUser,
					role_id: roleId,
					actived,
				}
				await api.patch('/technician', edit)
				setTypeMessage('success')
				setMessage('Técnico editado com sucesso!')
				timeMessage(setMessage, setTypeMessage)
				handleClear()
			} catch (error) {
				console.error({ error })
				setTypeMessage('error')
				setMessage(error.response.data.error || error.response.data.erros)
				timeMessage(setMessage, setTypeMessage)
				handleClear()
			}
		}
	}

	if (screen === 'create') {
		return (
			<Container minHeight='70vh' backgroundColor='main' btnHome={true}>
				<div className={style.container_technician}>
					<Link to='/menu'>
						<Button typeImage='home' title='Voltar ao menu' />
					</Link>
					<h2>Técnico</h2>
					<Form handleOnSubmit={handleSubmit}>
						<div className={style.lines}>
							<Input
								name='name'
								nameLabel='Nome'
								type='text'
								value={name}
								placeholder='Digite o nome do técnico'
								handleOnChange={(e) => setName(e.currentTarget.value)}
								divWidth='100%'
							/>
							<Input
								name='last_name'
								nameLabel='Sobrenome'
								type='text'
								value={lastName}
								placeholder='Digite o sobrenome do técnico'
								handleOnChange={(e) => setLastName(e.currentTarget.value)}
								divWidth='100%'
							/>
							<Input
								name='rg'
								nameLabel='RG'
								type='text'
								value={rg}
								placeholder='Digite o RG do técnico'
								handleOnChange={(e) => setRg(e.currentTarget.value)}
								divWidth='100%'
							/>
							<Input
								name='cpf'
								nameLabel='CPF'
								type='text'
								value={cpf}
								placeholder='Digite o CPF do técnico'
								handleOnChange={(e) => setCpf(e.currentTarget.value)}
								divWidth='100%'
							/>
						</div>
						<div className={style.lines}>
							<Input
								name='car'
								nameLabel='Veículo'
								type='text'
								value={car}
								placeholder='Digite o nome do veiculo do técnico'
								handleOnChange={(e) => setCar(e.currentTarget.value)}
								divWidth='30%'
							/>
							<Input
								name='plate'
								nameLabel='Placa'
								type='text'
								value={plate}
								placeholder='Digite a placa do veiculo'
								handleOnChange={(e) => setPlate(e.currentTarget.value)}
								divWidth='30%'
							/>

							<CheckBox
								flexDirection='column'
								name='system_user'
								nameLabel='Usuário do sistema?'
								value={systemUser}
								checked={!systemUser ? false : true}
								width='80%'
								togleOnChange={togleSystemUser}
							/>
							<Select
								name='role'
								defaultValue='Selecione um perfil'
								labelSelect='Perfil de usuário'
								flexDirection='column'
								divWidth='15%'
								display={display}
								// marginLabel='0 0 2em 0'
							>
								{roles.map((role) => {
									return <option key={role.role_id}>{role.description}</option>
								})}
							</Select>
							<CheckBox
								flexDirection='column'
								name='actived'
								nameLabel='Ativo'
								value={actived}
								checked={actived && true}
								togleOnChange={togleActived}
							/>
						</div>
						{typeBtn === 'add' ? (
							<div className={style.div_buttons}>
								<Button
									name='btn_incluir'
									typeImage={typeBtn}
									width='4em'
									height='4em'
									type='submit'
									title={
										typeBtn === 'add' ? 'Incluir técnico!' : 'Editar técnico!'
									}
								/>

								<Button
									name='btn_list_technician'
									typeImage='list'
									width='4em'
									height='4em'
									title='Lista de técnicos'
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
										typeBtn === 'add' ? 'Incluir técnico!' : 'Editar técnico!'
									}
								/>

								<Button
									name='btn_list_technician'
									typeImage='list'
									width='4em'
									height='4em'
									title='Lista de técnicos'
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
						{message && (
							<Message
								typeMesssage={typeMessage}
								width='100%'
								margin='1em 0 1em 0'>
								{message}
							</Message>
						)}
					</Form>
				</div>
			</Container>
		)
	} else if (screen === 'edit') {
		return (
			<TechnicianTable
				screen={setScreen}
				technicianEdit={setEditTechnician}
				btn={setTypeBtn}
			/>
		)
	}
}

export default Technician
