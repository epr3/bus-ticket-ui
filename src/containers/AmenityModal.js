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
  Button,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AmenityIconSelect from "../components/AmenityIconSelect";

function AmenityModal(props) {
  const { register, handleSubmit } = useForm();
  const [name] = useState((props.item && props.item.name) || "");
  const [icon, setIcon] = useState((props.item && props.item.icon) || "");
  const [priceModifier] = useState(
    (props.item && props.item.priceModifier) || 0
  );
  const [priceModifierType, setPriceModifierType] = useState(
    (props.item && props.item.priceModifierType) || ""
  );

  const postAmenity = useStoreActions(actions => actions.amenity.postAmenity);
  const putAmenity = useStoreActions(actions => actions.amenity.putAmenity);
  const closeModal = useStoreActions(actions => actions.modal.closeModal);

  const onSubmit = async data => {
    try {
      if (props.item) {
        await putAmenity({ ...data, id: props.item.id });
      } else {
        await postAmenity(data);
      }
      closeModal("amenity");
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
              <Label>Amenity name</Label>
              <Input
                name="name"
                type="text"
                placeholder="Enter amenity name"
                defaultValue={name}
                innerRef={register}
              />
            </FormGroup>
            <FormGroup>
              <InputGroup>
                {icon && (
                  <InputGroupAddon addonType="prepend">
                    <Button disabled>
                      <FontAwesomeIcon icon={icon} />
                    </Button>
                  </InputGroupAddon>
                )}
                <AmenityIconSelect
                  onChange={setIcon}
                  innerRef={register}
                  value={icon}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label>Price modifier</Label>
              <Input
                name="priceModifier"
                type="text"
                placeholder="Enter price modifier"
                defaultValue={priceModifier}
                innerRef={register}
              />
            </FormGroup>
            <FormGroup>
              <Label>Price modifier type</Label>
              <Input
                name="priceModifierType"
                type="select"
                value={priceModifierType}
                onChange={e => setPriceModifierType(e.target.value)}
                innerRef={register}
              >
                <option value={""}>None</option>
                <option value="multiply">Multiply</option>
                <option value="add">Add</option>
              </Input>
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

export default AmenityModal;
