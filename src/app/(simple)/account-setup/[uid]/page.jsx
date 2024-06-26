'use client'

import {
  Button,
  FormGroup,
  Form,
  Label,
  Input,
  Container,
  Row,
  Col,
  FormFeedback
} from 'reactstrap'

import { db } from '@/scripts/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page({ params }) {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [invalid, setInvalid] = useState(false);

  const router = useRouter()

  async function submitHandler() {
    if (username.length <= 0 || firstName.length <= 0 || lastName.length <= 0) return setInvalid(true)

    let user = (await getDoc(doc(db, 'user', params.uid))).data()

    user.d_name = username
    user.first_name =  firstName
    user.last_name = lastName

    await setDoc(doc(db, 'user', params.uid), user)
    router.push('/')
  }

  return (
    <main className='p-0 position-relative bg-light text-dark'>
      <Container className='vh-100 vw-100 d-flex justify-content-center align-items-center'>
        <Form onKeyDown={event => {
          if (event.key === "Enter") {
            event.preventDefault()
            submitHandler()
          }
        }}>
          <h1 className='mb-4'>Make an account with ConFlix</h1>
          <FormGroup floating>
            <Input
              placeholder='Username'
              type='text'
              value={username}
              invalid={!(username.length > 0) && invalid}
              onChange={e => setUsername(e.target.value)}
            />
            <FormFeedback>
              * Please fill out the required fields
            </FormFeedback>
            <Label>
              Username
            </Label>
          </FormGroup>
          <Row>
            <Col>
              <FormGroup floating>
                <Input
                  placeholder='First name'
                  type='text'
                  value={firstName}
                  invalid={!(firstName.length > 0) && invalid}
                  onChange={e => setFirstName(e.target.value)}
                />
                <FormFeedback>
                  * Please fill out the required fields
                </FormFeedback>
                <Label>
                  First name
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup floating>
                <Input
                  placeholder='Last name'
                  type='text'
                  value={lastName}
                  invalid={!(lastName.length > 0) && invalid}
                  onChange={e => setLastName(e.target.value)}
                />
                <FormFeedback>
                  * Please fill out the required fields
                </FormFeedback>
                <Label>
                  Last name
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Button className='my-3' block onClick={submitHandler}>
            Complete Account
          </Button>
        </Form>
      </Container>
    </main>
  )
}