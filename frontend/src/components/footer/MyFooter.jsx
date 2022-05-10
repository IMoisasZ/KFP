import React from 'react'
import Container from '../container/MyContainer'
import style from './MyFooter.module.css'

function MyFooter() {
	return (
		<Container height='5em' alignItems='center' justifyContent='center'>
			<footer className={style.container_footer}>
				<p>KFP Climatização e Instalações Ltda.</p>
				<p>&copy; Todos os direitos reservados 2022</p>
			</footer>
		</Container>
	)
}

export default MyFooter
