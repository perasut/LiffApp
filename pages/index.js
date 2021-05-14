// import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Login from './login'
import Profile from './profile'

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({})
  const [email, setEmail] = useState({})
  const [users, setUsers] = useState(false)

  const verify = async (uid) => {
    const res = await fetch('/api/liff-api/index.php/users/verify/'+uid, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })

    const result = await res.json()
    // console.log('result', result)
    return result
  }

  useEffect(async () => {
    const liff = (await import('@line/liff')).default
    await liff.ready
    const profile = await liff.getProfile()
    const email = liff.getDecodedIDToken().email
    setProfile(profile)
    setEmail(email)
    
    const verifyData = await verify(profile.userId)
    console.log('result', verifyData)
    if(verifyData.status === 'success'){
      setUsers(verifyData.data)
    }

    setLoading(true)

  }, [profile.userId])

  return (
    <Container fluid="md" className="m-0 p-0">
      {!loading ? (
        <Row className="justify-content-md-center p-3">
          <Col className="text-center">
            <Spinner animation="border" variant="primary" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      ) : (
        !users ? <Login profile={profile} email={email} />:<Profile profile={profile} email={email} users={users} /> 
      )}
    </Container>
  )
}
