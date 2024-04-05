import { useRef } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage'
import { storage } from "../../global/firebase.config"
import { apiRequest } from "../../global/apiRequest"
import toast from "react-hot-toast"
import { v4 } from "uuid"

const AddDevice = ({ location }) => {

    const serialNumberRef = useRef()
    const typeRef = useRef()
    const imageRef = useRef()
    const statusRef = useRef()
    const imageUrlRef = useRef("")

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const serialNumber = serialNumberRef.current.value.trim()
            const type = typeRef.current.value.trim()            
            const status = statusRef.current.value.trim()
            
            // image upload and get url
            const image = imageRef.current.files[0]
            const imageUpload = ref(storage,`DeviceImage/${v4()}`)
            const data = await uploadBytes(imageUpload, image)
            const downloadImageURL = await getDownloadURL(data.ref)
            imageUrlRef.current = downloadImageURL

            const formData = {
                locationId : location?._id,
                serialNumber,
                type,
                image : imageUrlRef.current,
                status
            }
            const response = await apiRequest('/device/add-device', 'post', formData)
            toast.success(response.data.message)                      
            
        } catch (error) {            
            console.error(error)
        }        
    }
  return (
    <>
        <Container>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Serial Number</Form.Label>
                    <Form.Control type="text" ref={serialNumberRef} placeholder="Enter Human readable name" required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Device Type</Form.Label>
                    <Form.Select ref={typeRef} aria-label="Default select example">
                        <option>Select device type</option>
                        <option value={'pos'}>Pos</option>
                        <option value={'kisok'}>Kisok</option>
                        <option value={'signage'}>Signage</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Image</Form.Label>
                    <Form.Control type="file" ref={imageRef} placeholder="Enter phone number" maxLength={10} minLength={10} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Device Status</Form.Label>
                    <Form.Select ref={statusRef} aria-label="Default select example">
                        <option>Select Status</option>
                        <option value={'Active'}>Active</option>
                        <option value={'Inactive'}>Inactive</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">Add Device</Button>
            </Form>
        </Container>
    </>
  )
}

export default AddDevice