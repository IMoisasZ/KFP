import React from 'react'
import style from './MySelect.module.css'

function MySelect({
	name,
	value,
	handleOnChange,
	children,
	defaultValue = 'Escolha um item da lista',
	labelSelect = 'Nome do select',
	width,
	height = '2.5em',
	divWidth,
}) {
	return (
		<div className={style.container_select} style={{ width: divWidth }}>
			<label htmlFor={name}>{labelSelect}</label>
			<select
				style={{ width, height }}
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
