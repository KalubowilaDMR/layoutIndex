import { useEffect, useState } from "react"
import { Container, Card, Table, Button, Modal } from "react-bootstrap"
import { apiRequest } from "../global/apiRequest";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import UpdateDevice from "../components/device/updateDevice";
import { storage } from "../global/firebase.config";
import { deleteObject, ref } from "firebase/storage";

const Device = () => {
  const [deviceData, setDeviceData] = useState([])
  const [updateModalShow, setUpdateModalShow] = useState(false)
  const [updateData, setUpdateDta] = useState()

  useEffect(()=>{
    renderDeviceData()
  },[])

  const handleUpdateModelVisible = (device) => {
    setUpdateModalShow((prev) => !prev)
    setUpdateDta(device)
    renderDeviceData()
  }

  // render all device data
  const renderDeviceData = async() => {
    try {
      const response = await apiRequest('/device/all-devices', 'get')
      setDeviceData(response.data.data);
    } catch (error) {
      console.error(error)
    }
  }

  // delete device
  const deleteDevice = async(device) => {
    try {
      const imgUrl = `${device?.image}`
      const imgRef = ref(storage, imgUrl)
      deleteObject(imgRef).then(async() => {
        console.log('delete success');
        const response = await apiRequest(`/device/delete-device/${device?._id}`, 'delete')
        toast.success(response.data.message);
        renderDeviceData()
      }).catch((error) => {
        console.log('Image delete Error', error);
      })      
    } catch (error) {
      console.error(error)
    }
  }  

  return (
    <>
      {/* Update Device */}
      <Modal show={updateModalShow} onHide={() => handleUpdateModelVisible(null)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add Device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateDevice device={updateData}/>
        </Modal.Body>
      </Modal>

      <Container fluid className="px-5 py-3">
        <Card>
          <Card.Title className="text-center mt-3">Device Details</Card.Title>
          <Card.Body>
            <div className="ps-2 pb-4">
              <Button as={Link} to={'/'}>Add Location</Button>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="column1">Id</th>
                  <th className="column2">Serial Number</th>
                  <th className="column3">Type</th>
                  <th className="column4">Image URL</th>
                  <th className="column5">Status</th>
                  <th className="column6">Action</th>
                </tr>
              </thead>
              <tbody>
                {deviceData?.map((device, index) => (
                  <tr key={index}>
                    <td>{device?._id}</td>
                    <td>{device?.serialNumber}</td>
                    <td>{device?.type}</td>
                    <td>
                      <a href={device?.image} target="_blank">
                        {device?.image}
                      </a>
                    </td>
                    <td>{device?.status}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button value={device?._id} variant="primary" as={Link} to={device? `/device-details/${device._id}` : '/'}>View</Button>
                        <Button value={device?._id} variant="success" onClick={() => handleUpdateModelVisible(device)}>Update</Button>
                        <Button value={device?._id} variant="delete" onClick={() => deleteDevice(device)}>Delete</Button>
                      </div>
                    </td>                
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default Device