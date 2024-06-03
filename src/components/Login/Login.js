import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import './Login.css';
import { useState } from 'react';
import useToken from '../../utils/useToken';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { setToken } = useToken();
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { email, password };
        //console.log(`email: ${email}, password: ${password}`);
        axios
          .post("http://codingtest.local/api/login", user)
          .then((res) =>{
            console.log(res);
            setToken(res.data.token);
            return navigate('/', {replace: true });
          }
          )
          .catch((err) => {
            setError('Invalid User Name or Password');
            setTimeout(() => {
                setError(false);
            }, 5000);
          });
    }

    return (
        <div className="mx-auto login-box">
            <h1>Login</h1>
            {error && <Alert key='warning' variant='warning'>
                    {error}
            </Alert> }
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Login