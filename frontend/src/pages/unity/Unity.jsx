import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/container/MyContainer'
import Form from '../../components/form/MyForm'
import Input from '../../components/input/MyInput'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/MyMessage'
import UnityTable from './UnityTable'
import style from './Unity.module.css'
import api from '../../api/api'
import timeMessage from '../../utils/timeMessage.util'

function Unity() {
	// data about unity
	const [tag, setTag] = useState('')
	const [description, setDescription] = useState('')
	const [actived, setActived] = useState(true)
	const [screen, setScreen] = useState('create')
	const [editUnity, setEditUnity] = useState('')
	const [typeBtn, setTypeBtn] = useState('add')

	// edit unity
	useEffect(() => {
		setTag(editUnity.unity_tag)
		setDescription(editUnity.unity_description)
		setActived(editUnity.unity_actived)
	}, [editUnity])

	// message
	const [message, setMessage] = useState('')
	const [typeMessage, setTypeMessage] = useState('')

	// togle actived
	const togleActived = () => {
		setActived(!actived)
	}

	// clear the form
	const handleClear = () => {
		setTag('')
		setDescription('')
		setActived(true)
		setEditUnity('')
		setTypeBtn('add')
		setScreen('create')
	}

	// submit
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (typeBtn === 'add') {
			try {
				const newUnity = {
					unity_tag: tag,
					unity_description: description,
					unity_actived: actived,
				}

				await api.post('/unity', newUnity)
				setTypeMessage('success')
				setMessage('Unidade cadastrada com sucesso!')

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
					unity_id: editUnity.unity_id,
					unity_tag: tag,
					unity_description: description,
					unity_actived: actived,
				}
				await api.patch('/unity', edit)
				setTypeMessage('success')
				setMessage('Unidade editada com sucesso!')

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
				<div className={style.container_unidade}>
					<Link to='/menu'>
						<Button typeImage='home' title='Voltar ao menu' />
					</Link>
					<h2>Unidade</h2>
					<Form handleOnSubmit={handleSubmit}>
						<Input
							name='tag'
							nameLabel='Sigla'
							type='text'
							value={tag}
							placeholder='Digite a tag da unidade'
							handleOnChange={(e) => setTag(e.currentTarget.value)}
							divWidth='100%'
						/>
						<Input
							name='description'
							nameLabel='Descrição'
							type='text'
							value={description}
							placeholder='Digite descrição da unidade'
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
										typeBtn === 'add' ? 'Incluir unidade!' : 'Editar unidade!'
									}
								/>

								<Button
									name='btn_list_unity'
									typeImage='list'
									width='4em'
									height='4em'
									title='Lista de unidades'
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
										typeBtn === 'add' ? 'Incluir unidade!' : 'Editar unidade!'
									}
								/>

								<Button
									name='btn_list_unity'
									typeImage='list'
									width='4em'
									height='4em'
									title='Lista de unidades'
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
			<UnityTable
				screen={setScreen}
				unityEdit={setEditUnity}
				btn={setTypeBtn}
			/>
		)
	}
}

export default Unity
