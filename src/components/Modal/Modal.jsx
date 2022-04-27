import { Modal, Button } from 'react-bootstrap'
import QRCode from 'react-qr-code'
import { useState } from 'react'
import axios from '../../services/axios'
import Form from '../Form/Form'

const ModalComponent = ({
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
}) => {
	const [rawDocs, setRawDocs] = useState({})

	const createPerson = (e) => {
		const person = {
			name: name,
			age: age,
		}
		axios
			.post(`/createPerson`, person, {
				headers: {
					Authorization: `Basic ${localStorage.getItem('token')}`,
				},
			})
			.then((res) => {
				setCurrentId(res.data.id)
				// e.target.style.display = 'none'
                setFieldDisabled(true)
                setCurrentStage({
					identity: 2,
					address: 2,
					relationship: 2,
					dob: 2,
				})
				console.log(res)
			})
			.catch((err) => console.log(err.message))
	}

    const getRaw = (type) => {
		axios
			.get(
				`/getRaw/${currentId}/${type}`,
				{
					headers: {
						Authorization: `Basic ${localStorage.getItem('token')}`,
					},
				}
			)
            .then((res) => {
                console.log(res.data.raw)
                setRaw({
                    type: type,
                    data: res.data.raw.data
                })
                localStorage.setItem('raw', res.data.raw.data)
				setRawDocs((prev) => ({
					...prev,
					identity: res.data.raw.data,
                }))
                switch (type) {
					case 'identity':
						setCurrentStage((prev) => ({
							...prev,
							identity: 3,
						}))
						break
					case 'address':
						setCurrentStage((prev) => ({
							...prev,
							address: 3,
						}))
						break
					case 'relationship':
						setCurrentStage((prev) => ({
							...prev,
							relationship: 3,
						}))
						break
					case 'dob':
						setCurrentStage((prev) => ({
							...prev,
							dob: 3,
						}))
						break
					default:
						break
				}
            })
			.catch((err) => {
				console.log(err.message)
			})
	}

	return (
		<Modal
			show={show}
			onHide={() => handleClose('clear')}
			backdrop='static'
			keyboard={false}
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<Modal.Title className='w-100 text-center ps-3'>
					Enter Person Data
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form
					{...{
						setCurrentId,
						fieldDisabled,
						setFieldDisabled,
						name,
						setName,
						age,
						setAge,
					}}
				/>
				{currentId !== '' && (
					<div className='d-flex justify-content-center my-3 w-100'>
						<QRCode value={currentId} />
					</div>
				)}
				{currentStage.identity === 1 && (
					<Button
						type='button'
						onClick={(e) => createPerson(e)}
						disabled={name === '' || age === ''}>
						Create User
					</Button>
				)}
				{currentStage.identity === 2 && (
					<Button type='button' onClick={() => getRaw('identity')}>
						Get Raw POI
					</Button>
				)}
				{currentStage.identity === 3 && (
					<Button type='button' onClick={() => handleClose('hide')}>
						Edit Raw POI
					</Button>
				)}
				{currentStage.identity === 4 && (
					<Button type='button'>
						Save
					</Button>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button variant='primary' onClick={() => handleClose('clear')}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ModalComponent
