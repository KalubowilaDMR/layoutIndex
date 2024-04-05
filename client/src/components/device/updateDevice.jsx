import { useEffect, useRef } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { storage } from "../../global/firebase.config"
import { uploadBytes, ref, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import { apiRequest } from "../../global/apiRequest"
import toast from "react-hot-toast"

const UpdateDevice = ({ device }) => {

  const serialNumberRef = useRef()
  const typeRef = useRef()
  const imageRef = useRef()
  const statusRef = useRef()
  const imageURL = useRef("")

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const serialNumber = serialNumberRef.current.value.trim()
      const type = typeRef.current.value.trim()            
      const status = statusRef.current.value.trim()

      // image upload
      const image = imageRef.current.files[0]
      const uploadRef = ref(storage, `DeviceImage/${v4()}`)

      const upload = await uploadBytes(uploadRef, image)
      const downloadURL = await getDownloadURL(upload.ref)
      imageURL.current = downloadURL

      const formData = {
        serialNumber,
        type,
        status,
        image : imageURL.current
      }

      // update api call
      const response = await apiRequest(`/device/update-device/${device?._id}`, 'put', formData)
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
                    <Form.Label className="fw-semibold">Device ID</Form.Label>
                    <Form.Control type="text" className="bg-light" defaultValue={device?._id} readOnly={true}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Serial Number</Form.Label>
                    <Form.Control type="text" ref={serialNumberRef} defaultValue={device?.serialNumber} placeholder="Enter Human readable name" required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Device Type</Form.Label>
                    <Form.Select ref={typeRef} defaultValue={device?.type} aria-label="Default select example" required>
                        <option value={'pos'}>Pos</option>
                        <option value={'kisok'}>Kisok</option>
                        <option value={'signage'}>Signage</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Image</Form.Label>
                    <Form.Control type="file" ref={imageRef}  placeholder="Enter phone number" maxLength={10} minLength={10} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Device Status</Form.Label>
                    <Form.Select ref={statusRef} defaultValue={device?.status} aria-label="Default select example" required>
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

export default UpdateDevice