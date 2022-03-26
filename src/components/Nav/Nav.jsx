import { Link } from 'react-router-dom'

const Nav = (props) => {

    const { setToken, valid, setValid, routeHistory } = props    

	const logoutHandler = () => {
		localStorage.removeItem('token')
		setValid(false)
		setToken(null)
		routeHistory('/login')
	}

	return (
		<nav className='navbar navbar-expand navbar-light fixed-top'>
			<div className='container'>
				<Link className='navbar-brand' to={'/'}>
					Home
				</Link>
				<div className='collapse navbar-collapse'>
					<ul className='navbar-nav ml-auto'>
						<li className='nav-item'>
							<Link to={'/login'} className='nav-link'>
								Login
							</Link>
						</li>
						{/* <li className='nav-item'>
							<Link to={'/register'} className='nav-link'>
								Sign up
							</Link>
						</li> */}
					</ul>
				</div>

				<button
					className='btn btn-primary btn-block'
					onClick={logoutHandler}>
					Log out
				</button>
			</div>
		</nav>
	)
}

export default Nav
