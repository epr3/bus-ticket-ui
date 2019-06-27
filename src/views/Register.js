import React, { useState } from "react";
import useForm from "react-hook-form";
import { useStoreActions } from "easy-peasy";

import history from "../lib/history";

import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap";

import { Link } from "react-router-dom";

import GuestLayout from "../layouts/GuestLayout";

function Register() {
  const { register, handleSubmit } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telephone, setTelephone] = useState("");

  const registerAction = useStoreActions(actions => actions.auth.register);

  const onSubmit = async data => {
    await registerAction(data);
  };

  return (
    <GuestLayout>
      <Card style={{ width: "500px" }}>
        <CardBody>
          <CardTitle>Register</CardTitle>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup row />
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
            <FormGroup>
              <Label>Name</Label>
              <Input
                name="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                innerRef={register}
              />
            </FormGroup>
            <FormGroup>
              <Label>Surname</Label>
              <Input
                name="surname"
                type="text"
                placeholder="Surname"
                value={surname}
                onChange={e => setSurname(e.target.value)}
                innerRef={register}
              />
            </FormGroup>
            <FormGroup>
              <Label>Telephone</Label>
              <Input
                name="telephone"
                type="tel"
                placeholder="+4076..."
                value={telephone}
                onChange={e => setTelephone(e.target.value)}
                innerRef={register}
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Register
            </Button>
          </Form>
          <CardText>
            Have an account? Log in <Link to="/login">here</Link>
          </CardText>
        </CardBody>
      </Card>
    </GuestLayout>
  );
}

export default Register;
