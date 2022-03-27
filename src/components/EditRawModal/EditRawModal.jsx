import { Modal, Button } from 'react-bootstrap'

const EditRawModal = ({ raw, showEditModal, handleEditClose }) => {
    
    const base64 = ((buffer) => {
        let bin = ''
        let bytes = new Uint8Array(buffer)
        let len = bytes.length
        for (let i = 0; i < len; i++)
            bin += String.fromCharCode(bytes[i])
        return window.btoa(bin)
    })(raw?.data)
    
    return (
		<Modal
			show={showEditModal}
			onHide={() => handleEditClose(raw?.type)}
			backdrop='static'
			keyboard={false}
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<Modal.Title className='w-100 text-center ps-3'>
					Edit raw
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{raw?.data && <img
					src={`data:image/jpeg;base64,${base64}`}
					alt=''
				/>}
			</Modal.Body>
			<Modal.Footer>
				<Button variant='primary' onClick={() => handleEditClose(raw?.type)}>
					Done
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default EditRawModal