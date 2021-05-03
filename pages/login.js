import { useEffect, useState } from 'react'
import { Router, useRouter } from 'next/router'
import Head from 'next/head'
import { Container, Row, Col, Form, Button, Image, Alert } from 'react-bootstrap'

export default function Login () {
  const router = useRouter()

  const userLogin = event => {
    event.preventDefault()
    router.push('/success')
  }

  return (
    <section>
      <Head>
        <title>Login & Register</title>
      </Head>
      <Container fluid="md" className="m-2 p-2">
        <Row classNanme="justify-content-md-center mb-2">
          <Col span={12} className="text-center">
            <h3>Login</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={userLogin}>
              <Form.Group>
                <Form.Label>Fullname</Form.Label>
                <Form.Control id="name" name="name" type="text" placeholder="Enter fullname" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control id="email" name="email" type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control id="mobile" name="mobile" type="text" placeholder="Enter mobile number" />
              </Form.Group>

              <Button block variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}