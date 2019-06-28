import React, { useState, useEffect, useMemo } from "react";
import useForm from "react-hook-form";
import { useStoreActions, useStoreState } from "easy-peasy";

import {
  ModalBody,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  ListGroup,
  ListGroupItem
} from "reactstrap";

import AmenityModal from "./AmenityModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BusModal(props) {
  const { register, handleSubmit } = useForm();
  const [plateNo] = useState((props.item && props.item.plateNo) || "");
  const [busMake] = useState((props.item && props.item.busMake) || "");
  const [busModel] = useState((props.item && props.item.busModel) || "");
  const [name] = useState((props.item && props.item.driver.name) || "");
  const [surname] = useState((props.item && props.item.driver.surname) || "");
  const [amenities, setAmenities] = useState(
    (props.item && props.item.amenities.map(item => item.id)) || []
  );

  const amenitiesStore = useStoreState(state => state.amenity.amenities);

  const postBus = useStoreActions(actions => actions.bus.postBus);
  const putBus = useStoreActions(actions => actions.bus.putBus);
  const openModal = useStoreActions(actions => actions.modal.openModal);
  const closeModal = useStoreActions(actions => actions.modal.closeModal);
  const getAmenities = useStoreActions(actions => actions.amenity.getAmenities);

  useEffect(() => {
    getAmenities();
  }, [getAmenities]);

  const computedAmenities = useMemo(
    () =>
      amenitiesStore.map(item => ({
        ...item,
        isActive: amenities.some(amenity => amenity === item.id)
      })),
    [amenitiesStore, amenities]
  );

  const toggleAmenity = id => {
    const isAdded = amenities.some(amenity => amenity === id);
    if (!isAdded) {
      setAmenities(amenities.concat(id));
    } else {
      setAmenities(amenities.filter(amenity => amenity !== id));
    }
  };

  const openAmenityModal = () =>
    openModal({
      id: "amenity",
      component: <AmenityModal />,
      closeModal: () => closeModal("amenity")
    });

  const onSubmit = async data => {
    try {
      if (props.item) {
        await putBus({ ...data, id: props.item.id, amenities });
      } else {
        await postBus(data);
      }
      closeModal("bus");
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
              <Label>Plate number</Label>
              <Input
                name="plateNo"
                type="text"
                placeholder="Enter plate number"
                defaultValue={plateNo}
                innerRef={register}
              />
            </FormGroup>
            <FormGroup>
              <Label>Bus Make</Label>
              <Input
                name="busMake"
                type="text"
                placeholder="Enter bus make"
                defaultValue={busMake}
                innerRef={register}
              />
            </FormGroup>
            <FormGroup>
              <Label>Bus Model</Label>
              <Input
                name="busModel"
                type="text"
                placeholder="Enter bus model"
                defaultValue={busModel}
                innerRef={register}
              />
            </FormGroup>
            <FormGroup>
              <Label>Driver name</Label>
              <Input
                name="name"
                type="text"
                placeholder="Enter driver name"
                defaultValue={name}
                innerRef={register}
              />
            </FormGroup>
            <FormGroup>
              <Label>Driver surname</Label>
              <Input
                name="surname"
                type="text"
                placeholder="Enter driver surname"
                defaultValue={surname}
                innerRef={register}
              />
            </FormGroup>
            <FormGroup>
              <Label>Amenities</Label>
              <ListGroup>
                {computedAmenities.length
                  ? computedAmenities.map(item => (
                      <ListGroupItem
                        key={item.id}
                        onClick={() => toggleAmenity(item.id)}
                        active={item.isActive}
                      >
                        <FontAwesomeIcon icon={item.icon} />
                        {item.name}
                      </ListGroupItem>
                    ))
                  : null}
                <ListGroupItem
                  color="success"
                  onClick={() => openAmenityModal()}
                >
                  Add amenity
                </ListGroupItem>
              </ListGroup>
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

export default BusModal;
