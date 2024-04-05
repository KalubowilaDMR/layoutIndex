import { Button, Container, Form } from "react-bootstrap"

const ViewDevices = () => {
  return (
    <>
        <Container>
            <p>device Id</p>
            <Form encType="multipart/form-data">
                <p>{location?._id}</p>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Serial Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Human readable name" required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Device Type</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Select device type</option>
                        <option value={'pos'}>Pos</option>
                        <option value={'kisok'}>Kisok</option>
                        <option value={'signage'}>Signage</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Image</Form.Label>
                    <Form.Control type="file" placeholder="Enter phone number" maxLength={10} minLength={10} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Device Status</Form.Label>
                    <Form.Select aria-label="Default select example">
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

export default ViewDevices