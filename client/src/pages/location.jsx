import { useEffect, useState } from "react"
import { Container, Card, Table, Button, Modal, Form } from "react-bootstrap"
import AddLocation from "../components/location/addLocation";
import { apiRequest } from "../global/apiRequest";
import UpdateLocation from "../components/location/updateLocation";
import toast from "react-hot-toast";
import AddDevice from "../components/device/addDevice";
import { Link } from "react-router-dom";

const Location = () => {
  const [addModalShow, setAddModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [addDeviceModalShow, setAddDeviceModalShow] = useState(false);
  const [viewDeviceDataModal, setViewDeviceDataModal] = useState(false);
  const [locationData, setLocationData] = useState([])
  const [locationUpdateData, setLocationUpdateData] = useState()
  const [viewDeviceData, setViewDeviceData] = useState([])
  const [deviceId, setDeviceId] = useState()


  useEffect(() => {
    renderLocations()
  }, [])

  // location add modal
  const handleAddModelVisible = () => {
    setAddModalShow((prev) => !prev)
    renderLocations()
  }

  // location update modal
  const handleUpdateModelVisible = (location) => {
    setUpdateModalShow((prev) => !prev)
    setLocationUpdateData(location)
    renderLocations()
  }

  // add new device modal
  const handleAddDeviceModelVisible = (location) => {
    setAddDeviceModalShow((prev) => !prev)
    setLocationUpdateData(location)
    renderLocations()
  }

  // view devices id modal
  const handleViewDeviceModelVisible = (location) => {
    setViewDeviceDataModal((prev) => !prev)
    setViewDeviceData(location)
  }

  // fetch all location data
  const renderLocations = async() => {
    try {
      const response = await apiRequest('/location/all-locations', 'get')
      setLocationData(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  // delete location
  const deleteLocation = async(id) => {
    try {
      const response = await apiRequest(`/location/delete-location/${id}`, 'delete')
      toast.success(response.data.message)
      renderLocations()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {/* Add Location Model */}
      <Modal show={addModalShow} onHide={handleAddModelVisible} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddLocation/>
        </Modal.Body>
      </Modal>

      {/* Update Location Model */}
      <Modal show={updateModalShow} onHide={() => handleUpdateModelVisible(null)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateLocation location={locationUpdateData} />
        </Modal.Body>
      </Modal>

      {/* View Device Model */}
      <Modal show={viewDeviceDataModal} onHide={() => handleViewDeviceModelVisible(null)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>View Device Device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="d-flex gap-2" onChange={(e) => setDeviceId(e.target.value)}>
                <Form.Select aria-label="Default select example" required>
                  <option>Select Device ID</option>
                  {viewDeviceData?.map((device, index) => (
                      <option key={index} value={device}>{device}</option>
                  ))}
                </Form.Select>
              <Button as={Link} to={deviceId? `/device-details/${deviceId}` : '/'}>View Details</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Add Device Modal */}
      <Modal show={addDeviceModalShow} onHide={() => handleAddDeviceModelVisible(null)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add Device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddDevice location={locationUpdateData}/>
        </Modal.Body>
      </Modal>

      <Container fluid className="px-5 py-3">
        <Card>
          <Card.Title className="text-center mt-3">Location Details</Card.Title>
          <Card.Body>
            <div className="ps-2 pb-4">
              <Button onClick={handleAddModelVisible}>Add Location</Button>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="column1">Id</th>
                  <th className="column2">Name</th>
                  <th className="column3">Address</th>
                  <th className="column4">Phone</th>
                  <th className="column5">Devices</th>
                  <th className="column6">Action</th>
                </tr>
              </thead>
              <tbody>
                {locationData.map((location, index) => (
                  <tr key={index}>
                    <td>{location?._id}</td>
                    <td>{location?.name}</td>
                    <td>{location?.address}</td>
                    <td>{location?.phone}</td>
                    <td className="d-block">
                      {location?.devices.length} devices
                      <div>
                        <Button size="sm" variant="info" onClick={() => handleViewDeviceModelVisible(location?.devices)}>View all</Button>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button size="sm" variant="primary" value={location?._id} onClick={() => handleAddDeviceModelVisible(location)}>Add Device</Button>
                        <Button size="sm" variant="success" value={location?._id} onClick={() => handleUpdateModelVisible(location)}>Update</Button>
                        <Button size="sm" variant="danger" value={location?._id} onClick={() => deleteLocation(location?._id)}>Delete</Button>
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

export default Location