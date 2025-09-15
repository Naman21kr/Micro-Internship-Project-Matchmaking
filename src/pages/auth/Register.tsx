
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import './Register.css';

const Register = () => {
  const { dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' 
  });

  const { name, email, password, role } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/register', formData);
      dispatch({ type: 'LOGIN', payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <h1>Register</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicRole">
          <Form.Label>Role</Form.Label>
          <Form.Control as="select" name="role" value={role} onChange={onChange}>
            <option value="student">Student</option>
            <option value="project-owner">Project Owner</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
