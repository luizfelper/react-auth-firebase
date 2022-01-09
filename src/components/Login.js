import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

//Parei no minuto 25:44 do vídeo https://www.youtube.com/watch?v=PKwu15ldZ7k&t=2141s&ab_channel=WebDevSimplified

//08/01/2022 Não está sendo possível realizar o login na aplicação porque ainda não foi implementado a função de login no FrontEnd.

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup, currentUser } = useAuth();   
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch {
            setError("Falha ao fazer login");
        }
        setLoading(false);
    }
    
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Fazer Login</h2>
                    {currentUser && <Alert variant="success">
                        Você já está logado com o email:  
                         <h3> {currentUser.email}</h3>
                        </Alert>}
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
                        <Button disabled={loading} className="w-100" type="submit">Logar</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Não possui uma conta?<Link to={'/signup'}> Cadastre-se</Link>
            </div>
        </>
    )
}
