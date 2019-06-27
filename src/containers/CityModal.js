import React, { useState } from "react";
import useForm from "react-hook-form";
import { useStoreActions } from "easy-peasy";

import {
  ModalBody,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap";

function CityModal(props) {
  const { register, handleSubmit } = useForm();
  const [name] = useState((props.item && props.item.name) || "");

  const postCity = useStoreActions(actions => actions.city.postCity);
  const putCity = useStoreActions(actions => actions.city.putCity);
  const closeModal = useStoreActions(actions => actions.modal.closeModal);

  const onSubmit = async data => {
    try {
      if (props.item) {
        await putCity({ ...data, id: props.item.id });
      } else {
        await postCity(data);
      }
      closeModal("city");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ModalBody>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label>City name</Label>
              <Input
                name="name"
                type="text"
                placeholder="Enter city name"
                defaultValue={name}
                innerRef={register}
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Form>
        </CardBody>
      </Card>
    </ModalBody>
  );
}

export default CityModal;
