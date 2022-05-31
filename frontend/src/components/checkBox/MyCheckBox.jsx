import React from 'react'
import style from './MyCheckBox.module.css'

function MyCheckBox({
	name,
	nameLabel = 'name label checkbox',
	value,
	hide,
	disable,
	togleOnChange = null,
	flexDirection,
	margin,
	checked = true,
	padding,
	divWidth,
	width = '100%',
}) {
	return (
		<div
			className={style.container_checkBox}
			style={{ flexDirection, padding, width: divWidth }}>
			<label htmlFor={name} id={name} style={{ margin, width }}>
				{nameLabel}
			</label>
			<input
				type='checkbox'
				value={value}
				hidden={hide}
				disable={disable}
				onChange={togleOnChange}
				checked={checked}
			/>
		</div>
	)
}

export default MyCheckBox
