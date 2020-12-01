/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { signIn, register } from '../actions/userActions'
import './SignInForm.css'  

export default function SignInForm(){
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const [submitting, setSubmitting] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [error, setError] = useState(null)
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    const { email, password } = inputs
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setInputs(inputs => ({...inputs, [id]: value}))
    }
    
    const onSubmit = (e) => {
        e.preventDefault()

        const redirectPath = location?.state?.from || "/"
        const action = isRegister ? register : signIn

        setSubmitting(true)
        dispatch(action(email, password, redirectPath))
        .then(() => {
            setSubmitting(false)
            history.push(redirectPath)
        })
        .catch((error => {
            setSubmitting(false)
            const message = typeof error === 'string' ? error : error.message
            setError(message);
        }));
    };
    const submitText = submitting ? 'Loading' : isRegister ? 'Create Account' : 'Sign In'
    const linkDesc = isRegister ? 'Already have a Times account?' : 'Don’t have a Times account?'
    const linkText = isRegister ? 'Sign In' : 'Create Account'

    return (
        <div className='signin-container'>
            <Form onSubmit={onSubmit} >
                <Form.Group controlId="email" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleChange} required/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange} required/>
                </Form.Group>
                {error && <Alert variant='warning'>{error}</Alert>}
                <Button variant="primary" type="submit">{
                    submitting &&
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />}
                    {submitText}
                </Button>
                <div className="row ml-0 mr-0 mt-2">
                    <div className="form-inline">
                        <div className="mr-1">{linkDesc}</div>
                        <a href='#' onClick={(e) => {
                            e.preventDefault();
                            setIsRegister(isRegister => !isRegister)
                            setError(null)
                        }}>
                            {linkText}
                        </a>
                    </div>
                </div>
            </Form>
        </div>
    )
}