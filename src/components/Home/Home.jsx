// import axios from 'axios'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const Home = (props) => {
	const { setToken, valid, setValid, routeHistory } = props
    const [persons, setPersons] = useState([])
    
    const addPerson = () => {
        
    }

	return valid ? (
		<>
			{/* <h2>You are logged in!</h2> */}
			<div className='row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4 mx-3'>
				<div className='col'>
					<div className='card h-100'>
						<div className='card-body d-flex justify-content-center'>
							<button
								type='button'
                                className='btn btn-primary card-title mb-0'
                                onClick={addPerson}
                            >
								{/* <button type='button' class='btn btn-primary'> */}
								Add Person
								{/* </button> */}
							</button>
						</div>
					</div>
				</div>
				{persons.map((person) => (
					<div className='col' key={person.name}>
						<div className='card h-100'>
							<div className='card-body d-flex align-items-center justify-content-center'>
								<p className='card-title mb-0 text-center'>
									{person.name}
								</p>
							</div>
						</div>
					</div>
				))}
				{/* <div className='col'>
					<div className='card h-100'>
						<div className='card-body d-flex align-items-center justify-content-center'>
							<p className='card-title mb-0 text-center'>chk</p>
						</div>
					</div>
				</div> */}
			</div>
		</>
	) : (
		<Navigate
			to={{
				pathname: '/login',
			}}
		/>
	)
}

export default Home
