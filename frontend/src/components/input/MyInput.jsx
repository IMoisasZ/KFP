import React from 'react'
import style from './MyInput.module.css'

function MyInput({
	name,
	nameLabel = 'name label input',
	type,
	value,
	placeholder = 'texto placeholder',
	hide = false,
	disable,
	handleOnChange = null,
	flexDirection = 'column',
	width,
	margin = '0 0 1em 0',
	height,
}) {
	return (
		<div className={style.container_input} style={{ flexDirection, margin }}>
			<label htmlFor={name} id={name}>
				{nameLabel}
			</label>
			<input
				style={{ width, height }}
				type={type}
				value={value}
				placeholder={placeholder}
				hidden={hide}
				disable={disable}
				onChange={handleOnChange}
			/>
		</div>
	)
}

export default MyInput
