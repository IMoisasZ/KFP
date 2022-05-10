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
	margin = '0 0 1em 0',
	checked = true,
}) {
	return (
		<div className={style.container_checkBox} style={{ flexDirection, margin }}>
			<label htmlFor={name} id={name}>
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
