// import axios from 'axios'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Button, Card, Row, Col, CloseButton } from 'react-bootstrap'
import Modal from '../Modal/Modal'
import EditRawModal from '../EditRawModal/EditRawModal'
import axios from '../../services/axios'
import './Home.css'

const Home = (props) => {
	const { setToken, valid, setValid, routeHistory } = props
	const [persons, setPersons] = useState([])
	const [show, setShow] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [raw, setRaw] = useState(null)
	const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [exists, setExists] = useState(false)
	const [currentId, setCurrentId] = useState('')
	const [fieldDisabled, setFieldDisabled] = useState(false)

	// stages:
	//  1 - create
	//  2 - fetch
	//  3 - edit
	//  4 - done
	const [currentStage, setCurrentStage] = useState({
		identity: 1,
		address: 1,
		relationship: 1,
		dob: 1,
	})

	useEffect(() => {
		axios
			.get('/getDatabase')
			.then((resp) => setPersons(resp.data))
			.catch((err) => console.log(err.message))
	}, [])

	const handleClose = (action) => {
		if (action === 'hide') {
			setShow(false)
			// setCurrentId('')
			setShowEditModal(true)
			setFieldDisabled(false)
		} else if (action === 'clear') {
			setShow(false)
			setCurrentId('')
			setFieldDisabled(false)
			setName('')
			setAge('')
			setCurrentStage({
				identity: 1,
				address: 1,
				relationship: 1,
				dob: 1,
			})
		}
	}
    const handleShow = (person) => {
        setExists(true)
        setShow(true)
        setName(person.name)
        setAge(person.age)
        setCurrentId(person.id)
        setFieldDisabled(true)
        setCurrentStage({
			identity: 2,
			address: 2,
			relationship: 2,
			dob: 2,
		})
    }

	const handleEditClose = (type) => {
		setShowEditModal(false)
		setRaw(null)
		setFieldDisabled(true)
		setShow(true)
		switch (type) {
			case 'identity':
				setCurrentStage((prev) => ({
					...prev,
					identity: 4,
				}))
				break
			case 'address':
				setCurrentStage((prev) => ({
					...prev,
					address: 4,
				}))
				break
			case 'relationship':
				setCurrentStage((prev) => ({
					...prev,
					relationship: 4,
				}))
				break
			case 'dob':
				setCurrentStage((prev) => ({
					...prev,
					dob: 4,
				}))
				break
			default:
				break
		}
	}

    const deletePerson = (id) => {
        axios
            .delete(`/removePerson/${id}`)
            .then((resp) => {
                console.log(resp.data.message)
                setPersons(prev => prev.filter(person => person.id !== id))
            })
            .catch((err) => console.log(err.message))
    }

	return valid ? (
		<>
			<Modal
				{...{
					show,
					handleClose,
					currentId,
					setCurrentId,
					fieldDisabled,
					setFieldDisabled,
					name,
					setName,
					age,
					setAge,
					setRaw,
					currentStage,
					setCurrentStage,
					setPersons,
					exists,
				}}
			/>
			<EditRawModal
				{...{
					raw,
					showEditModal,
					handleEditClose,
					currentId,
				}}
			/>
			{/* User card stack */}
			<Row
				xs={2}
				sm={3}
				md={4}
				lg={5}
				className='g-4 mx-3 justify-content-center d-flex'>
				<Col>
					<Card className='h-100'>
						<Card.Body className='d-flex align-items-center justify-content-center'>
							<Button
								variant='primary'
								onClick={() => setShow(true)}
								className='m-0'>
								Add Person
							</Button>
						</Card.Body>
					</Card>
				</Col>
				{/* <Col>
					<Card className='h-100'>
						<Card.Body className='d-flex align-items-center justify-content-center'>
							<Card.Title className='mb-0 text-center'>
								check
							</Card.Title>
						</Card.Body>
					</Card>
				</Col> */}
				{persons &&
					persons.map((person, id) => (
						<Col key={id}>
							<Card className='h-100'>
								<Card.Body
									className='d-flex align-items-center justify-content-center
                                custom-card'>
									<Card.Title
                                        className='mb-0 text-center
                                        custom-card-title'
										onClick={() => handleShow(person)}>
										{person.name}
									</Card.Title>
									<CloseButton
										className='custom-close'
										onClick={() => deletePerson(person.id)}
									/>
								</Card.Body>
							</Card>
						</Col>
					))}
			</Row>
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
