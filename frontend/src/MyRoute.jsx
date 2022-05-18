import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/navBar/MyNavBar'
import Footer from './components/footer/MyFooter'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Menu from './pages/menu/Menu'
import Unity from './pages/unity/Unity'
import Product from './pages/product/Product'
import ClientSupplier from './pages/clientSupplier/ClientSupplier'

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
					<Route path='/product' element={<Product />} />
					<Route path='/client_supplier' element={<ClientSupplier />} />
				</Routes>
				<Footer />
			</Router>
		</>
	)
}

export default MyRoute
