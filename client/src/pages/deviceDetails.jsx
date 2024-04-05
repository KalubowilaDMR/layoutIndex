import { Button, Container, Form, Image } from "react-bootstrap"
import { useParams, Link } from "react-router-dom"
import { apiRequest } from "../global/apiRequest"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import noImage from "../assets/noImage.png"

const DeviceDetails = () => {

    // get device id from url params
    const {id} = useParams()
    const [data, setData] = useState()

    useEffect(()=>{
        getDeviceDetails()
        console.log(data);
    },[])

    // render all data
    const getDeviceDetails = async() => {
        try {
            const response = await apiRequest(`/device/get-device/${id}`, 'get')
            console.log(response);
            setData(response.data.data);
            toast.success(response.data.message)
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
        <Container className="pt-5">
            <Button as={Link} to="/" variant="primary" className="mb-4">Go Back</Button>
            <h2 className="fw-bold text-center mb-5">Device Details</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Serial Number</Form.Label>
                    <Form.Control type="text" defaultValue={data?.serialNumber} placeholder="Enter Serial Number" readOnly/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Device Type</Form.Label>
                    <Form.Control type="text" defaultValue={data?.type} placeholder="Enter Serial Number" readOnly/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Device Image</Form.Label>
                    {/* <Form.Control type="text" defaultValue={data?.image} placeholder="Enter Serial Number"/> */}
                </Form.Group>
                    <Image src={data? data.image : noImage} className="auto-size mb-5" alt="Device Image"/>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Status</Form.Label>
                    <Form.Control type="text" defaultValue={data?.status} placeholder="Enter Serial Number" readOnly/>
                </Form.Group>
            </Form>
        </Container>
    </>
  )
}

export default DeviceDetails