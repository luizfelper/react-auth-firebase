import React, { useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <Form>
                        <Form.Group id="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={passwordRef} type="password" placeholder="Enter Password" required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control ref={passwordConfirmRef} type="password" placeholder="Enter password again" required />
                        </Form.Group>
                        <Button className="w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Já possui uma conta? Log In
            </div>
        </>
    )
}
