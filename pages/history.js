import { useEffect, useState } from 'react'
import { Container, Row, Col, ButtonGroup, Button, Image, Form, Alert, Table } from 'react-bootstrap';

export default function History(props) {

  const [dataLoading, setdataLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(async () => {
    if (!dataLoading) {
      const res = await fetch('/api/liff-api/index.php/reward/history/'+props.users.users_id, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })

      const result = await res.json()
      if (result.status === 'success') {
        setData(result.data)
        setdataLoading(true)
      }
    }
  })

  return (
    <Container fluid className="m-0 p-0">
      <Row className="justify-content-md-center mb-2">
        <Col className="text-center">
          <h4>History</h4>
        </Col>
      </Row>
      <Row className="justify-content-md-center mb-2">
        <Col className="text-center">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Type</th>
                <th>Point</th>
              </tr>
            </thead>
            <tbody>
            {dataLoading && data.map(function (d) {
              return (
                <tr key={d.reward_history_id}>
                  <td>{d.reward_history_id}</td>
                  <td>{d.reward_history_date}</td>
                  <td>{d.reward_history_type}</td>
                  <td>{d.reward_history_point}</td>
                </tr>
              )
            })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}