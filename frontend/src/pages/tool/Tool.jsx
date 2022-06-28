import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/container/MyContainer'
import Form from '../../components/form/MyForm'
import Input from '../../components/input/MyInput'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/MyMessage'
import ToolTable from './ToolTable'
import style from './Tool.module.css'
import api from '../../api/api'
import timeMessage from '../../utils/timeMessage.util'

function Tool() {
	// data about tool
	const [description, setDescription] = useState('')
	const [actived, setActived] = useState(true)
	const [screen, setScreen] = useState('create')
	const [editTool, setEditTool] = useState('')
	const [typeBtn, setTypeBtn] = useState('add')

	// edit tool
	useEffect(() => {
		setDescription(editTool.description)
		setActived(editTool.actived)
	}, [editTool])

	// message
	const [message, setMessage] = useState('')
	const [typeMessage, setTypeMessage] = useState('')

	// togle actived
	const togleActived = () => {
		setActived(!actived)
	}

	// clear the form
	const handleClear = () => {
		setDescription('')
		setActived(true)
		setEditTool('')
		setTypeBtn('add')
		setScreen('create')
	}

	// submit
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (typeBtn === 'add') {
			try {
				const newTool = {
					description: description,
					actived: actived,
				}

				await api.post('/tool', newTool)
				setTypeMessage('success')
				setMessage('Ferramenta cadastrada com sucesso!')

				timeMessage(setMessage, setTypeMessage)
				handleClear()
			} catch (error) {
				console.error({ error })
				setTypeMessage('error')
				error.response.data.error && setMessage(error.response.data.error)
				error.response.data.erros && setMessage(error.response.data.erros)

				timeMessage(setMessage, setTypeMessage)
				handleClear()
			}
		} else {
			try {
				const edit = {
					tool_id: editTool.tool_id,
					description,
					actived,
				}
				await api.patch('/tool', edit)
				setTypeMessage('success')
				setMessage('Ferramenta editada com sucesso!')

				timeMessage(setMessage, setTypeMessage)
				handleClear()
			} catch (error) {
				console.error({ error })
				setTypeMessage('error')
				error.response.data.error && setMessage(error.response.data.error)
				error.response.data.erros && setMessage(error.response.data.erros)
				timeMessage(setMessage, setTypeMessage)
				handleClear()
			}
		}
	}

	if (screen === 'create') {
		return (
			<Container minHeight='70vh' backgroundColor='main' btnHome={true}>
				<div className={style.container_tool}>
					<Link to='/menu'>
						<Button typeImage='home' title='Voltar ao menu' />
					</Link>
					<h2>Ferramenta</h2>
					<Form handleOnSubmit={handleSubmit}>
						<Input
							name='description'
							nameLabel='Descrição'
							type='text'
							value={description}
							placeholder='Digite descrição da ferramenta'
							handleOnChange={(e) => setDescription(e.currentTarget.value)}
							divWidth='100%'
						/>
						<CheckBox
							flexDirection='row'
							name='actived'
							nameLabel='Ativo'
							value={actived}
							checked={actived && true}
							togleOnChange={togleActived}
							margin='0 1em'
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
											? 'Incluir ferramenta!'
											: 'Editar ferramenta!'
									}
								/>

								<Button
									name='btn_list_unity'
									typeImage='list'
									width='4em'
									height='4em'
									title='Lista de ferramentas'
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
											? 'Incluir ferramenta!'
											: 'Editar ferramenta!'
									}
								/>

								<Button
									name='btn_list_unity'
									typeImage='list'
									width='4em'
									height='4em'
									title='Lista de ferramentas'
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
								margin='1em 0 0 0'>
								{message}
							</Message>
						)}
					</Form>
				</div>
			</Container>
		)
	} else if (screen === 'edit') {
		return (
			<ToolTable screen={setScreen} toolEdit={setEditTool} btn={setTypeBtn} />
		)
	}
}

export default Tool
