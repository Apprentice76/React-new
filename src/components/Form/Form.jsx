import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'

const FormComponent = ({
	setCurrentId,
	fieldDisabled,
	setFieldDisabled,
	name,
	setName,
	age,
	setAge,
}) => {
	// const [name, setName] = useState('')
	// const [age, setAge] = useState('')

	// const createPerson = () => {
	// 	const person = {
	// 		name: name,
	// 		age: age,
	// 	}
	// 	axios
	// 		.post(`${process.env.REACT_APP_BACKEND_URL}/createPerson`, person, {
	// 			headers: {
	// 				Authorization: `Basic ${localStorage.getItem('token')}`,
	// 			},
	// 		})
	// 		.then((res) => {
	// 			setCurrentId(res.data.id)
	// 			setFieldDisabled(true)
	// 			console.log(res)
	// 		})
	// 		.catch((err) => console.log(err.message))
	// }

	return (
		<Form>
			<fieldset disabled={fieldDisabled}>
				<Form.Group className='mb-3'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Name'
						value={name}
						onChange={(e) =>
							setName(e.target.value)
						}></Form.Control>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Label>Age</Form.Label>
					<Form.Control
						type='number'
						placeholder='Age'
						value={age}
						onChange={(e) => setAge(e.target.value)}></Form.Control>
				</Form.Group>
				{/* <Form.Group>
            <Form.Control type='file'></Form.Control>
            </Form.Group> */}
				{/* <Button
					type='button'
					onClick={createPerson}
					disabled={name === '' || age === ''}>
					Create User
				</Button> */}
			</fieldset>
		</Form>
	)
}

export default FormComponent
