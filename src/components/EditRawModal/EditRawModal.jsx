import Cropper from 'react-perspective-cropper'
import { useState, useRef, useCallback, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'

const EditRawModal = ({ raw, showEditModal, handleEditClose, currentId }) => {
	const [img, setImg] = useState('')

    useEffect(() => {
        const bytes = new Uint8Array(raw?.data)
        const file = new File([bytes], 'img.png', { type: 'image/png' })
        console.log(file)
        setImg(file)
    }, [raw?.data])

	// const base64 = ((buffer) => {
	// 	// let bin = ''
	// 	let bytes = new Uint8Array(buffer)
	// 	// let len = bytes.length
	// 	// for (let i = 0; i < len; i++) bin += String.fromCharCode(bytes[i])
	// 	// localStorage.setItem('tempImgString', window.btoa(bin))
	// 	// return bin
    //     const file = new File([bytes], 'img.png', { type: 'image/*' })
    //     console.log(file)
	// 	return file
	// 	// setImg(file)
	// 	// return file
	// 	// var binary = ''
	// 	// var bytes = new Uint8Array(buffer)
	// 	// var len = bytes.byteLength
	// 	// for (var i = 0; i < len; i++) {
	// 	// 	binary += String.fromCharCode(bytes[i])
	// 	// }
	// 	// return window.btoa(binary)
	// })(raw?.data)
	const [cropState, setCropState] = useState()
	const [editDone, setEditDone] = useState(false)
	const [uploaded, setUploaded] = useState(false)
	const [blob, setBlob] = useState(null)

    const cropperRef = useRef()
    
    const editorCloser = () => {
        setEditDone(false)
        setUploaded(false)
        setBlob(null)
        setImg('')
        handleEditClose(raw?.type)
    }

	const onDragStop = useCallback((s) => setCropState(s), [])
	const onChange = useCallback((s) => setCropState(s), [])

	const doSomething = async () => {
		// console.log(cropState)
		try {
			const res = await cropperRef.current.done({ preview: true })
			setEditDone(true)
			setBlob(res)
			console.log(res)
		} catch (err) {
			console.log('error', err.message)
		}
	}

	const sendEdited = () => {
        const file = new File([blob], `${blob.name}`, { type: `${blob.type}` })
        
        const formData = new FormData()
        formData.append('raw', file)

		axios
			.put(
				`${process.env.REACT_APP_BACKEND_URL}/uploadEdited/${currentId}/${raw.type}`,
				formData,
				{
					// headers: {
					// 	'Content-Type': 'multipart/form-data',
					// },
				}
			)
			.then(() => {
				setUploaded(true)
				localStorage.removeItem('raw')
			})
			.catch((err) => {
				console.log(err.message)
			})
	}

	// const onImgSelection = async (e) => {
	// 	if (e.target.files && e.target.files.length > 0) {
	// 		// it can also be a http or base64 string for example
	// 		setImg(e.target.files[0])
	// 	} else if (e.target.file) {
	// 		setImg(e.target.files)
	// 	}
	// }

	return (
		<Modal
			show={showEditModal}
			onHide={() => editorCloser()}
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
				{/* {raw?.data && (
					<img src={`data:image/jpeg;base64,${base64}`} alt='' />
				)} */}
				{raw && (
					<>
                        {img !== '' && <Cropper
                            maxHeight={500}
                            maxWidth={300}
							ref={cropperRef}
							image={img}
							onChange={onChange}
							onDragStop={onDragStop}
						/>}
						{/* <input
							type='file'
							onChange={onImgSelection}
							accept='image/*'
						/> */}
						{!editDone && (
							<Button onClick={doSomething}>Process Image</Button>
						)}
						{editDone && !uploaded && (
							<Button onClick={sendEdited}>Save</Button>
						)}
					</>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='primary'
					onClick={() => editorCloser()}
					disabled={!uploaded}>
					Done
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default EditRawModal
