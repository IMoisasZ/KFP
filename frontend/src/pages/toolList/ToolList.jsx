import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/container/MyContainer'
import Form from '../../components/form/MyForm'
import Input from '../../components/input/MyInput'
import Select from '../../components/select/MySelect'
import Table from '../../components/table/MyTable'
import Button from '../../components/button/MyButton'
import Message from '../../components/message/MyMessage'
import style from './ToolList.module.css'
import api from '../../api/api'
import timeMessage from '../../utils/timeMessage.util'
import today from '../../utils/today.util'
import formatDate from '../../utils/formatDate.util'

function ToolList() {
	// today
	const newToday = today()
	// data about tool_list
	const [dateToolList, setDateToolList] = useState(newToday)
	const [technicianId, setTechnicianId] = useState('')
	const [listTechnician, setListTechnician] = useState([])
	const [toolId, setToolId] = useState('')
	const [listTool, setListTool] = useState([])
	const [quantity, setQuantity] = useState('')
	const [listToolList, setListToolList] = useState([])

	// message
	const [message, setMessage] = useState('')
	const [typeMessage, setTypeMessage] = useState('')

	// list technician
	const allTechnician = async () => {
		const response = await api.get('/technician?technician_status')
		setListTechnician(response.data)
	}

	// list tool
	const allTool = async () => {
		const response = await api.get('/tool?tool_status')
		setListTool(response.data)
	}

	// load select technician and tool
	useEffect(() => {
		const load = async () => {
			allTechnician()
			allTool()
		}
		load()
	}, [])

	// clear the form
	const handleClear = () => {
		setDateToolList(newToday)
		setTechnicianId('')
		setToolId('')
		setQuantity('')
	}

	// submit
	const handleSubmit = async (e) => {
		e.preventDefault()
	}

	const headTable = ['Data', 'Ferramenta', 'Quantidade', 'Ações']

	useEffect(() => {
		const load = async () => {
			const response = await api.get(
				`/tool_list/all_tools_technician/${Number(technicianId)}`,
			)
			setListToolList(response.data)
		}
		load()
	}, [technicianId])
	console.log(technicianId)
	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					margin: '1em auto',
				}}>
				<Link to='/menu'>
					<Button typeImage='home' title='Voltar ao menu' />
				</Link>
				<h2>Lista de Ferramentas</h2>
			</div>
			<Container minHeight='60vh' backgroundColor='main' btnHome={true}>
				<div className={style.container_tool_list}>
					<Form handleOnSubmit={handleSubmit}>
						<Input
							name='dateToolList'
							nameLabel='Data'
							disable={true}
							type='date-local'
							value={dateToolList}
							handleOnChange={(e) => setDateToolList(e.currentTarget.value)}
							divWidth='100%'
						/>
						<Select
							name='technician'
							value={technicianId}
							defaultValue='selecione uma opção...'
							labelSelect='Técnico'
							handleOnChange={(e) => setTechnicianId(e.target.value)}
							height='2.3em'
							divWidth='100%'>
							{listTechnician.map((tech) => {
								return (
									<option key={tech.technician_id} value={tech.technician_id}>
										{tech.name}
									</option>
								)
							})}
						</Select>
						<Select
							name='tool'
							value={toolId}
							defaultValue='selecione uma opção...'
							labelSelect='Ferramenta'
							handleOnChange={(e) => setToolId(e.target.value)}
							height='2.3em'
							divWidth='100%'>
							{listTool.map((tool) => {
								return (
									<option key={tool.tool_id} value={tool.tool_id}>
										{tool.description}
									</option>
								)
							})}
						</Select>
						<Input
							name='quantity'
							nameLabel='Quantidade'
							type='text'
							value={quantity}
							handleOnChange={(e) => setQuantity(e.currentTarget.value)}
							divWidth='100%'
						/>
						{/* {typeBtn === 'add' ? (
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
					)} */}
						{message && (
							<Message
								typeMesssage={typeMessage}
								width='100%'
								margin='1em 0 0 0'>
								{message}
							</Message>
						)}
					</Form>
					{listToolList.length > 0 && (
						<div className={style.div_table}>
							<Table headTable={headTable}>
								{listToolList.map((tList) => {
									return (
										<tr key={tList.tool_list_id}>
											<td>{formatDate(tList.date_tool_list)}</td>
											<td>{tList.tool.description}</td>
											<td>{tList.quantity}</td>
										</tr>
									)
								})}
							</Table>
						</div>
					)}
					{technicianId === '' && <p>Técnico não selecionado!</p>}
					{technicianId !== '' && listToolList.length === 0 && (
						<p>Não há ferramentas para o técnico selecionado!</p>
					)}
				</div>
			</Container>
		</>
	)
}

export default ToolList
