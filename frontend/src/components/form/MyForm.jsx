import React from 'react'
import style from './MyForm.module.css'

function MyForm({ children, handleOnSubmit = null }) {
	return (
		<form className={style.container_form} onSubmit={handleOnSubmit}>
			{children}
		</form>
	)
}

export default MyForm
