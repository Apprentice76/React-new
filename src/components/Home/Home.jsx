// import axios from 'axios'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Button, Card, Row, Col } from 'react-bootstrap'
import Modal from '../Modal/Modal'
import EditRawModal from '../EditRawModal/EditRawModal'

const Home = (props) => {
	const { setToken, valid, setValid, routeHistory } = props
	const [persons, setPersons] = useState([])
	const [show, setShow] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [raw, setRaw] = useState(null)
	const [name, setName] = useState('')
	const [age, setAge] = useState('')
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
	const handleShow = () => setShow(true)

	const handleEditClose = (type) => {
		setShowEditModal(false)
		setRaw(null)
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

	const addPerson = () => {}

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
				}}
			/>
			<EditRawModal
				{...{
					raw,
					showEditModal,
					handleEditClose,
                    setShow,
				}}
			/>
			{/* User card stack */}
			<Row
				xs={2}
				sm={3}
				md={4}
				lg={5}
				className='g-4 mx-3 justify-content-center'>
				<Col>
					<Card className='h-100'>
						<Card.Body className='d-flex align-items-center justify-content-center'>
							<Button variant='primary' onClick={handleShow}>
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
				{persons.map((person, id) => (
					<Col key={id} className='h-100'>
						<Card>
							<Card.Body className='d-flex align-items-center justify-content-center'>
								<Card.Title className='mb-0 text-center'>
									{person.name}
								</Card.Title>
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
