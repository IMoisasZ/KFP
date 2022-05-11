import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/container/MyContainer'
import Form from '../../components/form/MyForm'
import Input from '../../components/input/MyInput'
import Select from '../../components/select/MySelect'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/MyMessage'
import api from '../../api/api'
import style from './Product.module.css'
import timeMessage from '../../utils/timeMessage.util'

function Product() {
	// useState
	const [internalCode, setInternalCode] = useState('')
	const [description, setDescription] = useState('')
	const [weight, setWeight] = useState(0)
	const [unityId, setUnityId] = useState('')
	const [listUnity, setListUnity] = useState([])
	const [minimum, setMinimum] = useState(0)
	const [actived, setActived] = useState(true)
	const [message, setMessage] = useState('')
	const [typeMessage, setTypeMessage] = useState('')
	const [typeBtn, setTypeBtn] = useState('add')

	// useEffect
	useEffect(() => {
		allUnits()
	}, [])

	const allUnits = async () => {
		const result = await api.get('/unity')
		setListUnity(result.data)
	}

	const handleUnity = (e) => {
		setUnityId(e.target.value)
	}

	const togleActived = () => {
		setActived(!actived)
	}

	const handleClear = async () => {
		setInternalCode('')
		setDescription('')
		setUnityId('')
		await allUnits()
		setMinimum(0)
		setWeight(0)
		setActived(true)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const newProduct = {
				internal_code: internalCode,
				description,
				weight_per_meter: weight,
				unity_id: unityId,
				minimum,
				actived,
			}
			await api.post('/product', newProduct)

			setTypeMessage('success')
			setMessage('Produto cadastrado com sucesso!')

			timeMessage(setTypeMessage, setMessage)

			handleClear()
		} catch (error) {
			console.log({ error })
			setTypeMessage('error')
			setMessage(error.response.data.error || error.response.data.erros)
			timeMessage(setTypeMessage, setMessage)
		}
	}

	return (
		<Container minHeight='75vh' maxHeight='80vh' backgroundColor='main'>
			<div className={style.container_product}>
				<Link to='/menu'>
					<Button typeImage='home' title='Voltar ao menu' />
				</Link>
				<h2>Produto</h2>
				<Form handleOnSubmit={handleSubmit}>
					<div className={style.line_one}>
						<Input
							name='internal_code'
							type='text'
							handleOnChange={(e) => setInternalCode(e.currentTarget.value)}
							value={internalCode}
							nameLabel='Código Interno'
							placeholder='Digite o código interno'
							width='10em'
						/>
						<Input
							name='description'
							type='text'
							handleOnChange={(e) => setDescription(e.currentTarget.value)}
							value={description}
							nameLabel='Descrição'
							placeholder='Digite a descrição do produto'
							width='32em'
						/>
					</div>
					<div className={style.line_two}>
						<Input
							name='weight_per_meter'
							type='numeric'
							handleOnChange={(e) => setWeight(e.currentTarget.value)}
							value={weight}
							nameLabel='Peso por metro'
							placeholder='Digite o peso por metro'
							width='13em'
						/>
						<Select
							name='unity'
							value={unityId}
							defaultValue='Escolha uma unidade...'
							labelSelect='Unidade'
							handleOnChange={handleUnity}
							width='13em'
							height='2.3em'>
							{listUnity.map((unity) => {
								return (
									<option key={unity.unity_id} value={unity.unity_id}>
										{unity.unity_tag}
									</option>
								)
							})}
						</Select>
						<Input
							name='minimum_stock'
							type='numeric'
							handleOnChange={(e) => setMinimum(e.currentTarget.value)}
							value={minimum}
							nameLabel='Estoque minimo'
							placeholder='Digite o estoque minimo'
							width='12em'
						/>
						<CheckBox
							name='actived'
							value={actived}
							checked={actived && true}
							nameLabel='Ativo'
							togleOnChange={togleActived}
							flexDirection='column'
							margin='0 0 1.1em 0'
						/>
					</div>
					<div className={style.div_buttons}>
						<Button
							name='btn_incluir'
							typeImage={typeBtn}
							width='4em'
							height='4em'
							type='submit'
							title={typeBtn === 'add' ? 'Incluir unidade!' : 'Editar unidade!'}
						/>

						<Button
							name='btn_list_unity'
							typeImage='list'
							width='4em'
							height='4em'
							title='Lista de unidades'
							// handleOnClick={() => setScreen('edit')}
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
				</Form>
				{message ? (
					<Message width='47%' typeMesssage={typeMessage}>
						{message}
					</Message>
				) : (
					''
				)}
			</div>
		</Container>
	)
}

export default Product
