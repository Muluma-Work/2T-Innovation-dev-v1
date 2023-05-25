import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'

import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom'


export default function Signup() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const {signup} = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    async function handleSubmit(e){
        e.preventDefault()

        //Validation checks
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return setError('Passwords do not match')
        }

        try{
            setError('')
            setIsLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/adminDash')

        }catch(err){
            setError('Failed to create account')
            console.log(err.message);
        }

        setIsLoading(false)

    }

  return (
    <>
        <Card >
            <Card.Body>
                <h2 className='text-canter mt-4'>Sign up </h2>
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

                    <Form.Group id="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' required ref={confirmPasswordRef}/>
                    </Form.Group>
                    <Button disabled={isLoading} className='w-100 mt-4' type='submit'>Sign up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Already have an accounct? <Link to={'/'}>Log in</Link>
        </div>
    </>
  )
}
