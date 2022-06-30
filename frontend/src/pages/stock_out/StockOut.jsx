import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/container/MyContainer'
import Form from '../../components/form/MyForm'
import Input from '../../components/input/MyInput'
import Select from '../../components/select/MySelect'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/MyMessage'
import Table from '../../components/table/MyTable'
import style from './StockOut.module.css'
import today from '../../utils/today.util'
import api from '../../api/api'
import timeMessage from '../../utils/timeMessage.util'
import formatDate from '../../utils/formatDate.util'

function StockOut() {
	// default date
	const defaultDate = today()
	// useState
	const [stockOutId, setStockOutId] = useState('')
	const [date, setDate] = useState(defaultDate)
	const [os, setOs] = useState('')
	const [product, setProduct] = useState('')
	const [listProduct, setListProduct] = useState([])
	const [description, setDescription] = useState('')
	const [unity, setUnity] = useState('')
    const [technician, setTechnician] = useState('')
    const [listTechnician, setListTechnician] = useState([])
    const [balance, setBalance] = useState('')
	const [listBalanceProducts, setBalanceProducts] = useState([])
	const [quantity, setQuantity] = useState('')
	const [averageCost, setAverageCost] = useState('')
	const [averageCostTotal, setAverageCostTotal] = useState('')
	const [typeBtn, setTypeBtn] = useState('add')
	const [typeMessage, setTypeMessage] = useState('')
	const [message, setMessage] = useState('')
	const [screen, setScreen] = useState('create')
	const [listStockOut, setListStockOut] = useState([])

	// handle products
	const handleProducts = async () => {
		const result = await api.get('/product?product_status')
		setListProduct(result.data)
		return result.data
	}

    // handle technician
	const handleTechnician = async () => {
		const result = await api.get('/technician?technician_status')
		setListTechnician(result.data)
		return result.data
	}

	useEffect(() => {
		const allSelects = async () => {
			await handleProducts()
			await handleTechnician()
		}
		allSelects()
	}, [])


	const handleBalance = async () => {
		const result = await api.get(`/stock_actual/${Number(product)}`)
		setBalance(result.data)
	}

	useEffect(() => {
		if(!product){
			return
		}
		handleBalance()
	},[product])

	console.log(balance);

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

	// handle averageCostTotal
	useEffect(() => {
		let result = 0
		if ((quantity !== 0 || quantity !== '') && (averageCost !== 0 || averageCost !== '')) {
			result = (quantity * averageCost).toLocaleString('pt-br', {
				style: 'currency',
				currency: 'BRL',
			})
			setAverageCostTotal(result)
		} else {
			return
		}
	}, [quantity, averageCost])

	// cretate a new stock Out
	const submit = async (e) => {
		e.preventDefault()
		if (typeBtn === 'add') {
			try {
				const Out = {
					date,
					os: os ? os : null,
					product_id: product,
                    technician_id: technician,
					quantity,
				}
				await api.post('/stock_Out', Out)

				setTypeMessage('success')
				setMessage('Saída de estoque realizada com sucesso!')

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
				const Out = {
					stock_Out_id: stockOutId,
					date,
					os: os ? os : null,
					product_id: product,
                    technician_id: technician,
					quantity,
				}
				await api.patch('/stock_Out', Out)

				setTypeMessage('success')
				setMessage('Saída de estoque editada com sucesso!')

				timeMessage(setTypeMessage, setMessage)
				handleClear()
			} catch (error) {
				console.error(error)
				setTypeMessage('error')
				setMessage(error.response.data.error || error.response.data.erros)
			}
		}
	}

	// list stock Out
	const allStockOut = async () => {
		const result = await api.get('/stock_Out')
		setListStockOut(result.data)
		return result.data
	}

	useEffect(() => {
		if (screen === 'edit') {
			allStockOut()
		}
	}, [screen])

	// handle edit
	const handleEditStockOut = async (id) => {
		try {
			const stockOutEdit = await api.get(`/stock_out/${Number(id)}`)
			setScreen('create')
			setTypeBtn('edit')
			setStockOutId(id)
			setDate(stockOutEdit.data.date)
			setOs(stockOutEdit.data.os)
			setProduct(stockOutEdit.data.product_id)
            setTechnician(stockOutEdit.data.technician_id)
			setQuantity(stockOutEdit.data.quantity)
		} catch (error) {
			console.error({ error })
			setTypeMessage('error')
			setMessage(error.response.data.error || error.response.data.erros)
		}
	}

	//  handle delete
	const handleDeleteStockOut = async (id, nf) => {
		try {
			await api.delete(`/stock_Out/${Number(id)}`)
			await allStockOut()
		} catch (error) {
			console.error({ error })
			setTypeMessage('error')
			setMessage(error.response.data.error || error.response.data.erros)
		}
	}

	// handle clear
	const handleClear = () => {
		setDate(defaultDate)
		setOs('')
		setProduct('')
		handleProducts()
        setTechnician('')
		handleTechnician()
		setDescription('')
		setUnity('')
		setQuantity('')
		setAverageCost('')
		setAverageCostTotal('')
		setTypeBtn('add')
		setScreen('create')
	}

	const headerTable = [
		'Data',
        'OS',
		'Produto',
        'Técnico',
		'Qtde',
		'Ações',
	]

	if (screen === 'create') {
		return (
			<Container minHeight='73vh' maxHeight='73vh' backgroundColor='main'>
				<div className={style.container_stock_out}>
					<Link to='/menu'>
						<Button typeImage='home' title='Voltar ao menu' />
					</Link>
					<h2>Saída de Estoque</h2>
					<Form handleOnSubmit={submit}>
						<div className={style.lines}>
							<div className={style.line}>
								<Input
									name='date'
									nameLabel='Data'
									type='datetime'
									value={date}
									handleOnChange={(e) => setDate(e.target.value)}
								/>

                                <Input
									name='os'
									nameLabel='OS'
									type='text'
									value={os}
									placeholder='Digite a OS'
									handleOnChange={(e) => setOs(e.target.value)}
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
								<Select
									name='technician'
									value={technician}
									labelSelect='Técnico'
									handleOnChange={(e) => setTechnician(e.target.value)}
									divWidth='23%'>
									{listTechnician.map((tech) => (
										<option key={tech.technician_id} value={tech.technician_id}>
											{`${tech.name} ${tech.last_name}`}
										</option>
									))}
								</Select>
							</div>
							<div className={style.line}>
								<div className={style.div_disabled}>
									<span>{balance}</span>
								</div>
								<Input
									name='quantity'
									nameLabel='Quantidade'
									type='number'
									value={quantity}
									placeholder='Digite a quantidade'
									handleOnChange={(e) => setQuantity(e.target.value)}
								/>
                                <div className={style.div_disabled}>
									<span>{averageCost}</span>
								</div>
                                <div className={style.div_disabled}>
									<span>{averageCostTotal}</span>
								</div>
							</div>
							{typeBtn === 'add' ? (
								<div className={style.div_buttons}>
									<Button
										name='btn_incluir'
										typeImage={typeBtn}
										width='4em'
										height='4em'
										type='submit'
										title='Incluir saída de estoque!'
									/>

									<Button
										name='btn_list_stock_out'
										typeImage='list'
										width='4em'
										height='4em'
										title='Saídas de estoque!'
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
										title={'Editar saída de estoque!'}
									/>

									<Button
										name='btn_list_stock_out'
										typeImage='list'
										width='4em'
										height='4em'
										title='Saídas de estoque'
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
							<Message
								width='100%'
								margin='1em 0 0 0'
								typeMesssage={typeMessage}>
								{message}
							</Message>
						) : (
							''
						)}
					</Form>
				</div>
			</Container>
		)
	} else {
		return (
			<Container Container height='70vh' backgroundColor='main'>
				<div className={style.container_table_Out}>
					<div>
						<h1>Saídas de Estoque</h1>
						<Button
							margin='1em 0 0 0'
							typeImage='back'
							title='Voltar ao lançamento de saídas de estoque!'
							handleOnClick={() => setScreen('create')}
						/>
					</div>
					<div className={style.div_table_out}>
						<Table headTable={headerTable} colSpan={2}>
							{listStockOut.map((stockOut) => (
								<tr key={stockOut.stock_out_id}>
									<td>{formatDate(stockOut.date)}</td>
									<td>{stockOut.os}</td>
									<td>{stockOut.product.description}</td>
                                    <td>{`${stockOut.technician.name} ${stockOut.technician.last_name}`}</td>
									<td>{stockOut.quantity}</td>
									<td>
										<Button
											typeImage='edit'
											color='orange'
											backgroundColor='transparent'
											title={`Editar a saída ${stockOut.stock_out_id} do dia ${stockOut.date}`}
											handleOnClick={() =>
												handleEditStockOut(stockOut.stock_out_id)
											}
										/>
									</td>
									<td>
										<Button
											typeImage='del'
											color='darkRed'
											backgroundColor='transparent'
											title={`Excluir a saída ${stockOut.stock_out_id} do dia ${stockOut.date} `}
											handleOnClick={() =>
												handleDeleteStockOut(
													stockOut.stock_out_id,
													stockOut.nf,
												)
											}
										/>
									</td>
								</tr>
							))}
						</Table>
					</div>
				</div>
			</Container>
		)
	}
}
export default StockOut
