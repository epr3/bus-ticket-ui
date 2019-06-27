import React, { useState } from "react";
import useForm from "react-hook-form";
import { useStoreActions } from "easy-peasy";
import { Link } from 'react-router-dom';

import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  CardText,
  Button
} from "reactstrap";

import GuestLayout from "../layouts/GuestLayout";

function Login() {
  const { register, handleSubmit } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useStoreActions(actions => actions.auth.login);

  const onSubmit = async data => {
    await login(data);
  };

  return (
    <GuestLayout>
      <Card style={{ width: "500px" }}>
        <CardBody>
          <CardTitle>Login</CardTitle>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label>E-mail</Label>
              <Input
                name="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                innerRef={register}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                innerRef={register}
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Login
            </Button>
          </Form>
          <CardText>
            Don't have an account? Register <Link to="/register">here</Link>
          </CardText>
        </CardBody>
      </Card>
    </GuestLayout>
  );
}

export default Login;
