import React from "react";
import useForm from "react-hook-form";
import { useStoreActions } from "easy-peasy";

import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap";

import GuestLayout from "../layouts/GuestLayout";

function Login() {
  const { register, handleSubmit } = useForm();

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
                innerRef={register}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                innerRef={register}
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Login
            </Button>
          </Form>
        </CardBody>
      </Card>
    </GuestLayout>
  );
}

export default Login;
