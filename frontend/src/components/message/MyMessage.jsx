import React from 'react'
import style from './MyMessage.module.css'

function MyMessage({
	children,
	typeMesssage,
	width = '100%',
	padding = '0.5em',
	margin,
}) {
	return (
		<div className={style.container_message} style={{ width }}>
			{typeMesssage === 'error' && (
				<p
					className={style.error}
					style={{ padding, borderRadius: '0.5em', margin }}>
					{children}
				</p>
			)}
			{typeMesssage === 'success' && (
				<p
					className={style.success}
					style={{ padding, borderRadius: '0.5em', margin }}>
					{children}
				</p>
			)}
			{typeMesssage === 'edit' && (
				<p
					className={style.edit}
					style={{ padding, borderRadius: '0.5em', margin }}>
					{children}
				</p>
			)}
		</div>
	)
}

export default MyMessage
