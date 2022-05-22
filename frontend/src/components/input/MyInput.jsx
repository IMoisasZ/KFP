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
	hadleOnAfterChange = null,
	flexDirection = 'column',
	margin = '0 0 1em 0',
	height,
	divWidth,
}) {
	return (
		<div
			className={style.container_input}
			style={{ flexDirection, margin, width: divWidth }}>
			<label htmlFor={name} id={name}>
				{nameLabel}
			</label>
			<input
				style={{ height }}
				type={type}
				value={value}
				placeholder={placeholder}
				hidden={hide}
				disable={disable}
				onChange={handleOnChange}
				onBlur={hadleOnAfterChange}
			/>
		</div>
	)
}

export default MyInput
