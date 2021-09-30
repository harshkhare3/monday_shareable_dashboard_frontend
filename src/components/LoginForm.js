import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";

const HOST = process.env.REACT_APP_BACKEND_HOST;

const LoginForm = ({ setFileUrl }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [dashboardUrl, setDashboardUrl] = useState("");
  const [disabled, setDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setDisabled(true);
    axios
      .post(`${HOST}/getDashboard`, {
        username: username,
        password: password,
        dashboardUrl: dashboardUrl,
      })
      .then((res) => {
        if (res.data.url) {
          setFileUrl(res.data.url);
        }
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="url">
        <Form.Label>Dashboard Url</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter dashboard url"
          value={dashboardUrl}
          onChange={(e) => setDashboardUrl(e.target.value)}
        ></Form.Control>
      </Form.Group>

      {disabled ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Button className="my-2" type="submit" variant="primary">
          Sign In
        </Button>
      )}
    </Form>
  );
};

export default LoginForm;
