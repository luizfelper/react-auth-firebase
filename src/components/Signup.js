import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        
        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError("Passwords do not match");
            return;
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch {
            setError("Failed to create an account");
        }
        setLoading(false);
    }
    
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Cadastrar</h2>
                    {currentUser && <Alert variant="success">Você já está logado!</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Endereço de Email</Form.Label>
                            <Form.Control ref={emailRef} type="email" placeholder="Digite seu email" required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control ref={passwordRef} type="password" placeholder="Digite sua senha" required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Confirmação de senha</Form.Label>
                            <Form.Control ref={passwordConfirmRef} type="password" placeholder="Digite sua senha novamente" required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Cadastrar</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Já possui uma conta? Log In
            </div>
        </>
    )
}
