import React from 'react'
import Container from '../../components/container/MyContainer'
import Form from '../../components/form/MyForm'
import Input from '../../components/input/MyInput'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Select from '../../components/select/MySelect'
import style from './StockEntry.module.css'

function StockEntry(params) {
	return (
		<Container height='71vh' backgroundColor='main'>
			<div className={style.container_stock_entry}>
				<Form>
					<div className={style.lines}>
						<div className={style.line_checkbox}>
							<CheckBox
								name='oppening_balance'
								nameLabel='Saldo inicial?'
								value=''
								checked
								justifyContent='flexStart'
							/>
						</div>

						<div className={style.line}>
							<Input name='date' />
							<Select name='client'></Select>
							<Select name='supplier'></Select>
							<Input name='nf' />
						</div>
						<div className={style.line}>
							<Select></Select>
							<span>Descrição</span>
							<span>Unidade</span>
						</div>
						<div className={style.line}>
							<Input name='opp' />
							<Input name='opp' />
							<span>Total</span>
						</div>
					</div>
				</Form>
			</div>
		</Container>
	)
}
export default StockEntry
