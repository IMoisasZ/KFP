import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/container/MyContainer'
import Form from '../../components/form/MyForm'
import Input from '../../components/input/MyInput'
import Button from '../../components/button/MyButton'
import style from './Login.module.css'

function Login() {
	// useState
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	return (
		<Container height='70vh' backgroundColor='main'>
			<section className={style.container_login}>
				<Form>
					<h1>Login</h1>
					<Input
						name='email'
						type='email'
						nameLabel='E-mail'
						placeholder='Digite seu email'
						value={email}
						handleOnChange={(e) => setEmail(e.currentTarget.value)}
					/>
					<Input
						name='password'
						type='password'
						nameLabel='Senha'
						placeholder='Digite sua senha'
						value={password}
						handleOnChange={(e) => setPassword(e.currentTarget.value)}
					/>
					<Link to='/menu'>
						<Button typeImage='text'>Entrar</Button>
					</Link>
				</Form>
			</section>
		</Container>
	)
}

export default Login
