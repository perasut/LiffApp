import { useEffect, useState } from 'react'
import Head from 'next/head'
// import Image from 'next/image'
import { Container, Row, Col, ButtonGroup, Button, Image, Form, Alert, Modal } from 'react-bootstrap';
import { PersonPlusFill, Award, UpcScan } from 'react-bootstrap-icons';

import Reward from './reward'
import History from './history'

// import liff from '@line/liff'

export default function Register(props) {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState('');
  const [code, setCode] = useState()
  const [friendFlag, setFriendFlag] = useState()
  const [os, setOs] = useState('ios')
  const [page, setPage] = useState('reward')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(async () => {
    // const liff = (await import('@line/liff')).default
    await liff.ready
    const checkOs = liff.getOS()
    setOs(checkOs)
    console.log(checkOs)
    liff.getFriendship().then(data => {
      console.log('friendFlag: ', data)
      if (data.friendFlag) {
        setFriendFlag(data.friendFlag)
      }
    });
  }, [])

  const scanCode = async () => {
    // await liff.ready
    const liff = (await import('@line/liff')).default
    // await liff.ready

    if (liff.isInClient() && liff.getOS() === "android") {
      const result = await liff.scanCode()
      // alert(JSON.stringify(result))
      setCode(result.value)
    } else {
      alert('Not support')
    }
  }

  const changePage = (page) => {
    setPage(page)
    console.log('page', page)
  }

  const collect = async () => {
    // setInfo(code)
    setInfo('loading...')
    handleShow()
    // console.log(props.users.users_id)
    // handleShow()
    // alert(point)
    const res = await fetch('/api/liff-api/index.php/reward/collect_point/'+props.users.users_id+'/5/'+code, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })

    const result = await res.json()
    setInfo(result.message)
    
  }

  return (
    <section>
      <Head>
        <title>My Profile</title>
      </Head>
      <Container fluid="md" className="m-2 p-2">
        <Row className="justify-content-md-center mb-2">
          <Col className="text-center">
            <h4>My Profile</h4>
          </Col>
        </Row>
        <div className="profile-box">
          <Row className="justify-content-md-center mb-2">
            <Col xs={4} className="text-center">
              {props.profile.pictureUrl && <Image
                src={props.profile.pictureUrl}
                alt={props.profile.displayName}
                width={96}
                height={96}
                roundedCircle
              />}
              <div className="mt-1 mb-1">
                <h5><Award size={24} />{' '} 5,000</h5>
              </div>
              {/* <div>{props.profile.displayName}</div>
            <div>{props.profile.userId}</div> */}
            </Col>
            <Col xs={8} className="text-left">
              <h5>{props.users.fullname}</h5>
              <div>{props.users.email}</div>
              <div>{props.users.mobile}</div>
              <div className="mt-1">
                {!friendFlag && <Button variant="success" size="sm">
                  <PersonPlusFill size={18} />{' '}Add Friend
                </Button>}
              </div>
            </Col>
          </Row>
        </div>
        <Row className="justify-content-md-center mt-2">
          <Col className="text-center">
            <ButtonGroup className="d-flex" aria-label="First group">
              <Button variant="info" className="w-100" onClick={() => changePage('reward')}>Reward</Button>
              <Button variant="info" className="w-100" onClick={() => changePage('collect')}>Collect Point</Button>
              <Button variant="info" className="w-100" onClick={() => changePage('history')}>History</Button>
            </ButtonGroup>
          </Col>
        </Row>

        {page === 'reward' && <Row className="justify-content-md-center mt-2">
          <Col xs={12} className="text-center">
            <Reward users={props.users} />
          </Col>
        </Row>}

        {page === 'collect' && <Row className="justify-content-md-center mt-2">
          <Col xs={12} className="text-center">
            <h5>Collect Point</h5>
          </Col>
          <Col xs={os === "ios" ? 12 : 8} className="text-center">
            <Form.Group>
              <Form.Control id="code" name="code" defaultValue={code} type="text" placeholder="Code" className="w-100" onChange={e => { setCode(e.currentTarget.value); }} required />
            </Form.Group>
          </Col>
          {os === "android" && <Col xs={4} className="text-center">
            <Button variant="primary" className="w-100" onClick={scanCode}>
              <UpcScan />{' '}Scan
            </Button>
          </Col>}
          <Col xs={12} className="text-center">
            <Button variant="primary" onClick={() => collect()} className="w-100">
              Save
            </Button>
          </Col>
        </Row>}

        {page === 'history' && <Row className="justify-content-md-center mt-2">
          <Col xs={12} className="text-center">
            <History users={props.users} />
          </Col>
        </Row>}
      </Container>
      <style jsx>{`
        .profile-box {
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 15px;
        }
      `}</style>
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