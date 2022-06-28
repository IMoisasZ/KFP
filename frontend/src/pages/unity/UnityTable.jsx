import React, { useState, useEffect } from 'react'
import Container from '../../components/container/MyContainer'
import Table from '../../components/table/MyTable'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/MyMessage'
import style from './UnityTable.module.css'
import api from '../../api/api'
import timeMessage from '../../utils/timeMessage.util'

function UnityTable({ screen, unityEdit, btn }) {
	// useState
	const [listUnits, setListUnits] = useState([])
	const [message, setMessage] = useState('')
	const [typeMessage, setTypeMessage] = useState('')

	// show all units
	const allUnits = async () => {
		const result = await (await api.get('/unity')).data
		setListUnits(result)
	}

	useEffect(() => {
		const loadUnits = async () => {
			await allUnits()
		}
		loadUnits()
	}, [])

	// header the table
	const headTable = ['ID', 'Unidade', 'Descriçao', 'Ativo', 'Ações']

	// disable or enable the unity
	const togleDisableEnable = async (unity_id, unity_actived) => {
		await api.put(`/unity`, {
			unity_id,
			unity_actived: !unity_actived,
		})
		await allUnits()
	}

	// delete unity
	const handleDelete = async (unity_id) => {
		try {
			const result = await api.delete(`/unity/${unity_id}`)
			await allUnits()
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

	// edit unity
	const handleEditUnity = (unity) => {
		screen('create')
		unityEdit(unity)
		btn('edit')
	}

	return (
		<Container height='70vh' backgroundColor='main'>
			<div className={style.container_table}>
				<Button
					margin='1em 0 0 0'
					typeImage='back'
					title='Voltar ao cadastro de unidade'
					handleOnClick={() => screen('create')}
				/>

				<h1>Lista de Unidades</h1>
				<Message typeMesssage={typeMessage} width='92.6%' margin='0 0 1em 0'>
					{message}
				</Message>
				{listUnits.length > 0 ? (
					<div className={style.table}>
						<Table headTable={headTable}>
							{listUnits.map((unity) => {
								return (
									<tr key={unity.unity_id}>
										<td>{unity.unity_id}</td>
										<td>{unity.unity_tag}</td>
										<td>{unity.unity_description}</td>
										<td>{unity.unity_actived ? 'Sim' : 'Não'}</td>
										<td>
											<Button
												typeImage='edit'
												color='orange'
												backgroundColor='transparent'
												title={`Editar a unidade ${unity.unity_tag}`}
												handleOnClick={() => handleEditUnity(unity)}
											/>
										</td>
										<td>
											{unity.unity_actived ? (
												<Button
													typeImage='enable'
													color='darkGreen'
													backgroundColor='transparent'
													title={`Desativar unidade ${unity.unity_tag}`}
													handleOnClick={() =>
														togleDisableEnable(
															unity.unity_id,
															unity.unity_actived,
														)
													}
												/>
											) : (
												<Button
													typeImage='disable'
													color='darkRed'
													backgroundColor='transparent'
													title={`Ativar unidade ${unity.unity_tag}`}
													handleOnClick={() =>
														togleDisableEnable(
															unity.unity_id,
															unity.unity_actived,
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
												title={`Excluir a unidade ${unity.unity_tag}`}
												handleOnClick={() => handleDelete(unity.unity_id)}
											/>
										</td>
									</tr>
								)
							})}
						</Table>
					</div>
				) : (
					<p>Não há unidades cadastradas!</p>
				)}
			</div>
		</Container>
	)
}

export default UnityTable
