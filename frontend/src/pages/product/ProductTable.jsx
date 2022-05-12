import React, { useState, useEffect } from 'react'
import Container from '../../components/container/MyContainer'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/MyMessage'
import Table from '../../components/table/MyTable'
import api from '../../api/api'
import timeMessage from '../../utils/timeMessage.util'
import style from './ProductTable.module.css'

function ProductTable({ screen, productEdit, btn }) {
	// useState
	const [listProducts, setListProducts] = useState([])
	const [message, setMessage] = useState('')
	const [typeMessage, setTypeMessage] = useState('')

	// show all products
	const allProducts = async () => {
		const result = await (await api.get('/product')).data
		setListProducts(result)
	}

	useEffect(() => {
		const loadProducts = async () => {
			await allProducts()
		}
		loadProducts()
	}, [])

	// header the table
	const headTable = [
		'Código Interno',
		'Produto',
		'Peso por Metro',
		'Unidade',
		'Estoque Minimo',
		'Ativo',
		'Ações',
	]

	// disable or enable the product
	const togleDisableEnable = async (product_id, actived) => {
		await api.put(`/product`, {
			product_id,
			actived: !actived,
		})
		await allProducts()
	}

	// delete product
	const handleDelete = async (product_id) => {
		try {
			const result = await api.delete(`/product/${product_id}`)
			await allProducts()
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

	// edit product
	const handleEditProduct = (product) => {
		screen('create')
		productEdit(product)
		btn('edit')
		console.log(product)
	}

	return (
		<Container height='75vh' backgroundColor='main'>
			<div className={style.container_table}>
				<Button
					margin='1em 0 0 0'
					typeImage='back'
					title='Voltar ao cadastro de produto'
					handleOnClick={() => screen('create')}
				/>

				<h1>Lista de Produtos</h1>
				<Message typeMesssage={typeMessage} width='92.6%' margin='0 0 1em 0'>
					{message}
				</Message>
				{listProducts.length > 0 ? (
					<div className={style.table}>
						<Table headTable={headTable}>
							{listProducts.map((product) => {
								return (
									<tr key={product.product_id}>
										<td>{product.internal_code}</td>
										<td>{product.description}</td>
										<td>{product.weight_per_meter}</td>
										<td>{product.unity.unity_tag}</td>
										<td>{product.minimum_amount}</td>
										<td>{product.actived ? 'Sim' : 'Não'}</td>
										<td>
											<Button
												typeImage='edit'
												color='orange'
												backgroundColor='transparent'
												title={`Editar o produto ${product.description}`}
												handleOnClick={() => handleEditProduct(product)}
											/>
										</td>
										<td>
											{product.actived ? (
												<Button
													typeImage='enable'
													color='darkGreen'
													backgroundColor='transparent'
													title={`Desativar o produto ${product.description}`}
													handleOnClick={() =>
														togleDisableEnable(
															product.product_id,
															product.actived,
														)
													}
												/>
											) : (
												<Button
													typeImage='disable'
													color='darkRed'
													backgroundColor='transparent'
													title={`Ativar o produto ${product.description}`}
													handleOnClick={() =>
														togleDisableEnable(
															product.product_id,
															product.actived,
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
												title={`Excluir o produto ${product.description}`}
												handleOnClick={() => handleDelete(product.product_id)}
											/>
										</td>
									</tr>
								)
							})}
						</Table>
					</div>
				) : (
					<p>Não há produtos cadastrados!</p>
				)}
			</div>
		</Container>
	)
}

export default ProductTable
