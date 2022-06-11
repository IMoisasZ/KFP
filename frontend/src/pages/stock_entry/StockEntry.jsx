import React, { useState, useEffect } from 'react'
import Container from '../../components/container/MyContainer'
import Form from '../../components/form/MyForm'
import Input from '../../components/input/MyInput'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Select from '../../components/select/MySelect'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/MyMessage'
import style from './StockEntry.module.css'
import today from '../../utils/today.util'
import api from '../../api/api'
import timeMessage from '../../utils/timeMessage.util'

function StockEntry() {
	// default date
	const defaultDate = today()

	// useState
	const [oppeningBalance, setOppeningBalance] = useState(false)
	const [date, setDate] = useState(defaultDate)
	const [client, setClient] = useState('')
	const [listClient, setListClient] = useState([])
	const [supplier, setSupplier] = useState('')
	const [listSupplier, setListSupplier] = useState([])
	const [NF, setNF] = useState('')
	const [product, setProduct] = useState('')
	const [listProduct, setListProduct] = useState([])
	const [description, setDescription] = useState('')
	const [unity, setUnity] = useState('')
	const [quantity, setQuantity] = useState('')
	const [price, setPrice] = useState('')
	const [total, setTotal] = useState('')
	const [typeBtn, setTypeBtn] = useState('add')
	const [typeMessage, setTypeMessage] = useState('')
	const [message, setMessage] = useState('')
	const [screen, setScreen] = useState('create')

	// oppening balance
	const handleOppeningBalance = () => {
		setOppeningBalance(!oppeningBalance)
	}

	// handle clients
	const handleClients = async () => {
		const result = await api.get('/client?client_status')
		setListClient(result.data)
		return result.data
	}

	// handle suppliers
	const handleSuppliers = async () => {
		const result = await api.get('/supplier?supplier_status')
		setListSupplier(result.data)
		return result.data
	}

	// handle products
	const handleProducts = async () => {
		const result = await api.get('/product?product_status')
		setListProduct(result.data)
		return result.data
	}

	useEffect(() => {
		const allSelects = async () => {
			await handleClients()
			await handleSuppliers()
			await handleProducts()
		}
		allSelects()
	}, [])

	// handle data prodcts
	useEffect(() => {
		const result = listProduct.filter(
			(item) => item.product_id === Number(product),
		)
		if (!result.length) {
			return
		}
		const descriptionProduct = result[0].description
		const unityTag = result[0].unity.unity_tag
		setDescription(descriptionProduct)
		setUnity(unityTag)
	}, [product, listProduct])

	// handle total
	useEffect(() => {
		let result = 0
		if ((quantity !== 0 || quantity !== '') && (price !== 0 || price !== '')) {
			result = (quantity * price).toLocaleString('pt-br', {
				style: 'currency',
				currency: 'BRL',
			})
			setTotal(result)
		} else {
			return
		}
	}, [quantity, price])

	// cretate a new stock entry
	const submit = async (e) => {
		e.preventDefault()
		if (screen === 'create') {
			try {
				const entry = {
					oppening_balance: oppeningBalance,
					date,
					client_id: client ? client : null,
					supplier_id: supplier ? supplier : null,
					nf: NF,
					product_id: product,
					quantity,
					price,
				}
				await api.post('/stock_entry', entry)
				setTypeMessage('success')
				setMessage('Entrada de estoque realizada com sucesso!')

				timeMessage(setTypeMessage, setMessage)

				handleClear()
			} catch (error) {
				console.error({ error })
				setTypeMessage('error')
				setMessage(error.response.data.error || error.response.data.erros)
				timeMessage(setTypeMessage, setMessage)
			}
		} else {
			try {
			} catch (error) {
				console.error(error)
				setTypeMessage('error')
				setMessage(error.response.data.error || error.response.data.erros)
			}
		}
	}

	console.log(message)

	// list stock entry

	// handle clear
	const handleClear = () => {
		setOppeningBalance(false)
		setDate(defaultDate)
		setClient('')
		handleClients()
		setSupplier('')
		handleSuppliers()
		setNF('')
		setProduct('')
		handleProducts()
		setDescription('')
		setUnity('')
		setQuantity('')
		setPrice('')
		setTotal('')
		setTypeBtn('add')
		setTypeMessage('')
		setMessage('')
		setScreen('create')
	}

	console.log(product)

	return (
		<Container height='71vh' backgroundColor='main'>
			<div className={style.container_stock_entry}>
				<Form handleOnSubmit={submit}>
					<div className={style.lines}>
						<div className={style.line_checkbox}>
							<CheckBox
								name='oppening_balance'
								nameLabel='Saldo inicial?'
								value={oppeningBalance}
								checked={oppeningBalance && true}
								justifyContent='flexStart'
								togleOnChange={handleOppeningBalance}
							/>
						</div>

						<div className={style.line}>
							<Input
								name='date'
								nameLabel='Data'
								type='datetime'
								value={date}
								handleOnChange={(e) => setDate(e.target.value)}
							/>
							<Select
								name='client'
								value={client}
								labelSelect='Cliente'
								handleOnChange={(e) => {
									setClient(e.target.value)
									setSupplier('')
								}}>
								{listClient.map((cli) => (
									<option key={cli.client_id} value={cli.client_id}>
										{cli.name}
									</option>
								))}
							</Select>
							<Select
								name='supplier'
								value={supplier}
								labelSelect='Fornecedor'
								handleOnChange={(e) => {
									setSupplier(e.target.value)
									setClient('')
								}}>
								{listSupplier.map((forn) => (
									<option key={forn.supplier_id} value={forn.supplier_id}>
										{forn.name}
									</option>
								))}
							</Select>
							<Input
								name='nf'
								nameLabel='NF'
								type='text'
								value={NF}
								placeholder='Digite a NF'
								handleOnChange={(e) => setNF(e.target.value)}
							/>
						</div>
						<div className={style.line}>
							<Select
								name='product'
								value={product}
								labelSelect='Código do Produto'
								handleOnChange={(e) => setProduct(e.target.value)}
								divWidth='23%'>
								{listProduct.map((prod) => (
									<option key={prod.product_id} value={prod.product_id}>
										{prod.internal_code}
									</option>
								))}
							</Select>
							<div className={style.div_disabled}>
								<span>{description}</span>
							</div>
							<div className={style.div_disabled}>
								<span>{unity}</span>
							</div>
						</div>
						<div className={style.line}>
							<Input
								name='quantity'
								nameLabel='Quantidade'
								type='number'
								value={quantity}
								placeholder='Digite a quantidade'
								handleOnChange={(e) => setQuantity(e.target.value)}
							/>
							<Input
								name='price'
								nameLabel='Unitário (R$)'
								type='number'
								value={price}
								placeholder='digite o preço unitario'
								handleOnChange={(e) => setPrice(e.target.value)}
							/>
							<span>Total: {total}</span>
						</div>
						{typeBtn === 'add' ? (
							<div className={style.div_buttons}>
								<Button
									name='btn_incluir'
									typeImage={typeBtn}
									width='4em'
									height='4em'
									type='submit'
									title={'Incluir entrada de estoque!'}
								/>

								<Button
									name='btn_list_product'
									typeImage='list'
									width='4em'
									height='4em'
									title='Lista de entradas de estoque!'
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
									title={'Editar entrada do estoque!'}
								/>

								<Button
									name='btn_list_product'
									typeImage='list'
									width='4em'
									height='4em'
									title='Lista de produtos'
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
					</div>
					{message ? (
						<Message width='100%' margin='1em 0 0 0' typeMesssage={typeMessage}>
							{message}
						</Message>
					) : (
						''
					)}
				</Form>
			</div>
		</Container>
	)
}
export default StockEntry
