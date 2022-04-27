import axios from '../../services/axios'
import { Navigate } from 'react-router-dom'
import { useState } from 'react'

const Login = (props) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { setToken, valid, setValid, routeHistory } = props

	const handleSubmit = (e) => {
		e.preventDefault()

		const data = {
			usr: email,
			pwd: password,
		}

		// const url = `${process.env.REACT_APP_BACKEND_URL}/login`

		// console.log(url)

		axios
			.post('/login', data)
			.then((res) => {
				localStorage.setItem('token', res.data.token)
				setToken(res.data.token)
				setValid(true)
				routeHistory('/')
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return valid ? (
		<Navigate
			to={{
				pathname: '/',
			}}
		/>
	) : (
		<div className='auth-inner'>
			<form onSubmit={(event) => handleSubmit(event)}>
				<h3>Login</h3>

				<div className='form-group'>
					<label>Email</label>
					<input
						type='email'
						className='form-control'
						placeholder='Email'
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className='form-group'>
					<label>Password</label>
					<input
						type='password'
						className='form-control'
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<button className='btn btn-primary btn-block'>Login</button>
			</form>
		</div>
	)
}

export default Login
