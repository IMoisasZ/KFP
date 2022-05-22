import React from 'react'
import style from './MySelect.module.css'

function MySelect({
	name,
	value,
	handleOnChange,
	children,
	defaultValue = 'Escolha um item da lista',
	labelSelect = 'Nome do select',
	height = '2.5em',
	divWidth,
	margin,
	disable,
	flexDirection,
	display,
}) {
	return (
		<div
			className={style.container_select}
			style={{ width: divWidth, margin, flexDirection, display }}>
			<label htmlFor={name}>{labelSelect}</label>
			<select
				disabled={disable}
				style={{ height }}
				name={name}
				id={name}
				value={value}
				onChange={handleOnChange}>
				<option value=''>{defaultValue}</option>
				{children}
			</select>
		</div>
	)
}

export default MySelect
