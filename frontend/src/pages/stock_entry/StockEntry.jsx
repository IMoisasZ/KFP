import React, { useState, useEffect } from 'react'
import Container from '../../components/container/MyContainer'
import Form from '../../components/form/MyForm'
import Input from '../../components/input/MyInput'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Select from '../../components/select/MySelect'
import style from './StockEntry.module.css'
import today from '../../utils/today.util'
import api from '../../api/api'

function StockEntry() {
	// default date
	const defaultDate = today()

	// useState
	const [oppeningBalance, setOppeningBalance] = useState(false)
	const [data, setData] = useState(defaultDate)
	const [client, setClient] = useState('')
	const [listClient, setListClient] = useState([])
	const [supplier, setSupplier] = useState('')
	const [listSupplier, setListSupplier] = useState([])
	const [NF, setNF] = useState('')
	const [product, setProduct] = useState('')
	const [listProduct, setListProduct] = useState([])
	// const [dataProduct, setDataProduct] = useState('')

	// oppening balance
	const handleOppeningBalance = () => {
		setOppeningBalance(!oppeningBalance)
	}

	// handle clients
	const handleClients = async () => {
		const result = await api.get('/client?client_status')
		setListClient(result.data)
	}

	// handle suppliers
	const handleSuppliers = async () => {
		const result = await api.get('/supplier?supplier_status')
		setListSupplier(result.data)
	}

	// handle products
	const handleProducts = async () => {
		const result = await api.get('/product?product_status')
		setListProduct(result.data)
	}

	useEffect(() => {
		const allSelects = async () => {
			await handleClients()
			await handleSuppliers()
			await handleProducts()
		}
		allSelects()
	}, [])

	// // handle data prodcts
	// useEffect(() => {
	// 	const result = listProduct.filter(
	// 		(item) => item.product_id === Number(product),
	// 	)
	// 	setDataProduct(result[0])
	// }, [product, listProduct])

	return (
		<Container height='71vh' backgroundColor='main'>
			<div className={style.container_stock_entry}>
				<Form>
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
								value={data}
								handleOnChange={(e) => setData(e.target.value)}
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
								handleOnChange={(e) => setProduct(e.target.value)}>
								{listProduct.map((prod) => (
									<option key={prod.product_id} value={prod.product_id}>
										{prod.internal_code}
									</option>
								))}
							</Select>
							{/* <p>{dataProduct.description || null}</p>

							<p>{dataProduct.unity.unity_tag || null}</p> */}
						</div>
						<div className={style.line}>
							<Input
								name='quantity'
								nameLabel='Quantidade'
								type='number'
								value={0}
							/>
							<Input
								name='price'
								nameLabel='Unitário'
								type='number'
								value={0}
							/>
							<span>Total</span>
						</div>
					</div>
				</Form>
			</div>
		</Container>
	)
}
export default StockEntry
