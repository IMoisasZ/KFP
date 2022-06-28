import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/container/MyContainer'
import Button from '../../components/button/MyButton'
import style from './Home.module.css'

function Home() {
	return (
		<Container height='70vh' backgroundColor='main'>
			<div className={style.container_home}>
				<h1> KFP SYSTEM</h1>
				<p>Clique no botão abaixo para fazer login e entrar no sistema!</p>
				<Link to='/login'>
					<Button typeImage='text'>Entrar</Button>
				</Link>
			</div>
		</Container>
	)
}

export default Home
