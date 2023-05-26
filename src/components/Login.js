import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'

import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    


    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError('')
            setIsLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/form')
        }catch(err){
            setError('Unable to login')
            console.log(err.message);
        }

        setIsLoading(false)

    }

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-canter mt-4'>Log In</h2>
                {error &&  <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' required ref={emailRef}/>
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' required ref={passwordRef}/>
                    </Form.Group>

                    <Button disabled={isLoading} className='w-100 mt-4' type='submit'>Log in</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Need an accounct? <Link to={'/signup'}> Sign up</Link>
        </div>
    </>
  )
}
