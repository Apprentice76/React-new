import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Home from '../Home/Home'
import Nav from '../Nav/Nav'
import Login from '../Login/Login'
// import Register from '../register.component';

const App = () => {
	const [token, setToken] = useState(null)
	const [valid, setValid] = useState(false)
	const routeHistory = useNavigate()

	useEffect(() => {
		const token_val = localStorage.getItem('token')
		if (token_val) {
			const url = `${process.env.REACT_APP_BACKEND_URL}/checkValidity`

			axios
				.get(url, {
					headers: {
						Authorization: `Basic ${token_val}`,
					},
				})
				.then((res) => {
					if (res.data.message === 'Token Valid') {
						setValid(true)
						setToken(token_val)
						console.log('valid')
					}
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}, [])

	const globals = {
		token,
		setToken,
		valid,
		setValid,
		routeHistory,
	}

	return (
		<div className='App'>
			<Nav {...globals} />
			<div className='auth-wrapper'>
				<Routes>
					<Route exact path='/' element={<Home {...globals} />} />
					<Route
						exact
						path='/login'
						element={<Login {...globals} />}
					/>
					{/* <Route exact path="/register" component={Register} /> */}
				</Routes>
			</div>
		</div>
	)
}

export default App
