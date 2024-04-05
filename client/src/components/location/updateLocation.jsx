import { useRef } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { apiRequest } from "../../global/apiRequest"
import toast from "react-hot-toast"

const UpdateLocation = ({ location }) => {
    const nameRef = useRef()
    const addressRef = useRef()
    const phoneRef = useRef()

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const name = nameRef.current.value.trim()
            const address = addressRef.current.value.trim()            
            const phone = phoneRef.current.value.trim()

            const formData = {
                name,
                address,
                phone
            }
            const response = await apiRequest(`/location/update-location/${location?._id}`, 'put', formData)
            toast.success(response.data.message)
            
        } catch (error) {            
            console.error(error)
        }
    }
  return (
    <>
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Location ID</Form.Label>
                    <Form.Control type="text"className="bg-light" placeholder="Enter Human readable name" defaultValue={location?._id} readOnly={true} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Name</Form.Label>
                    <Form.Control type="text" ref={nameRef} placeholder="Enter Human readable name" defaultValue={location?.name} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Address</Form.Label>
                    <Form.Control type="text" ref={addressRef} placeholder="Enter location address" defaultValue={location?.address} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Phone Number</Form.Label>
                    <Form.Control type="text" ref={phoneRef} placeholder="Enter phone number" defaultValue={location?.phone} maxLength={10} minLength={10} required/>
                </Form.Group>
                <Button variant="primary" type="submit">Add New</Button>
            </Form>
        </Container>
    </>
  )
}

export default UpdateLocation