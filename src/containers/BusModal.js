import React, { useState } from "react";
import useForm from "react-hook-form";
import { useStoreActions } from "easy-peasy";

import {
  ModalBody,
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

// <Form onSubmit={handleSubmit()}>
//   <FormGroup>
//     <Label>E-mail</Label>
//     <Input
//       name="email"
//       type="email"
//       placeholder="Enter email"
//       value={email}
//       onChange={e => setEmail(e.target.value)}
//       innerRef={register}
//     />
//   </FormGroup>
//   <FormGroup>
//     <Label>Password</Label>
//     <Input
//       name="password"
//       type="password"
//       placeholder="Password"
//       value={password}
//       onChange={e => setPassword(e.target.value)}
//       innerRef={register}
//     />
//   </FormGroup>
//   <Button color="primary" type="submit">
//     Login
//   </Button>
// </Form>;
function BusModal() {
  const { register, handleSubmit } = useForm();

  return (
    <ModalBody>
      <Card>
        <CardBody />
      </Card>
    </ModalBody>
  );
}

export default BusModal;
