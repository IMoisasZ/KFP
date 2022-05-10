import React from 'react'
import Container from '../container/MyContainer'
import style from './MyNavBar.module.css'
function MyNavBar() {
	return (
		<Container height='5em' marginTop='0.5em'>
			<nav className={style.container_navBar}>
				<h1>KFP</h1>
			</nav>
		</Container>
	)
}

export default MyNavBar
