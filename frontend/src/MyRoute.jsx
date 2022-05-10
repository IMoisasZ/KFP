import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/navBar/MyNavBar'
import Footer from './components/footer/MyFooter'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Menu from './pages/menu/Menu'
import Unity from './pages/unity/Unity'
import Error from './pages/error/Error'
import UnityTable from './pages/unity/UnityTable'

function MyRoute({ children }) {
	return (
		<>
			<Router>
				<NavBar />
				{children}
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/menu' element={<Menu />} />
					<Route path='/unity' element={<Unity />} />
					<Route path='/unity/list_unity' element={<UnityTable />} />
					<Route path='/error' element={<Error />} />
				</Routes>
				<Footer />
			</Router>
		</>
	)
}

export default MyRoute
