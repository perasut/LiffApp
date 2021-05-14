import { useEffect, useState } from 'react'
import { Container, Row, Col, ButtonGroup, Button, Image, Form, Alert, Card, Modal } from 'react-bootstrap';
import { Award } from 'react-bootstrap-icons';

export default function Reward(props) {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState('');
  const [rewardLoading, setrewardLoading] = useState(false);
  const [reward, setReward] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const redeem = async (point) => {
    // setInfo(props.users)
    console.log(props.users.users_id)
    handleShow()
    // alert(point)
    const res = await fetch('/api/liff-api/index.php/reward/redeem_point/'+props.users.users_id+'/'+point, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })

    const result = await res.json()
    setInfo(result.message)
    
  }

  useEffect(async () => {
    if (!rewardLoading) {
      const res = await fetch('/api/liff-api/index.php/reward/get_reward/', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })

      const result = await res.json()
      console.log('reward', result)
      if (result.status === 'success') {
        setReward(result.data)
        setrewardLoading(true)
      }
    }
  })

  return (
    <section>
      <Container fluid className="m-0 p-0">
        <Row className="justify-content-md-center mb-2">
          <Col className="text-center">
            <h4>Reward</h4>
          </Col>
        </Row>
        {/* {reward} */}
        {rewardLoading && reward.map(function (d) {
          return (
            <Row key={d.reward_id} className="justify-content-md-center mb-2">
              <Col className="m-0">
                <Card>
                  <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyVi_8EliaR6qrwspxfzFDkbVV18GTZQHTHQ&usqp=CAU" />
                  <Card.Body className="text-left">
                    <Card.Title><Award size={24} />{' '} {d.reward_point} - {d.reward_name}</Card.Title>
                    <Card.Text>
                    {d.reward_des}
                    </Card.Text>
                    <Button block variant="primary" onClick={() => redeem(d.reward_point)}>Redeem ({d.reward_point} Point)</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )
        })}

      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>{info}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}