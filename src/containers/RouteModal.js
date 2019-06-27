import React, { useState, useEffect } from "react";
import useForm from "react-hook-form";
import { useStoreActions, useStoreState } from "easy-peasy";

import {
  ModalBody,
  Card,
  CardBody,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Input,
  Label,
  Button
} from "reactstrap";

import CityModal from "./CityModal";

function RouteModal(props) {
  const { register, handleSubmit } = useForm();
  const [price] = useState((props.item && props.item.price) || 0);
  const [distance] = useState((props.item && props.item.distance) || 0);
  const [startCityId, setStartCityId] = useState(
    (props.item && props.item.startCityId) || ""
  );
  const [endCityId, setEndCityId] = useState(
    (props.item && props.item.endCityId) || ""
  );
  const cities = useStoreState(state => state.city.cities);

  const postRoute = useStoreActions(actions => actions.route.postRoute);
  const putRoute = useStoreActions(actions => actions.route.putRoute);
  const openModal = useStoreActions(actions => actions.modal.openModal);
  const closeModal = useStoreActions(actions => actions.modal.closeModal);
  const getCities = useStoreActions(actions => actions.city.getCities);

  useEffect(() => {
    getCities();
  }, [getCities]);

  const openCityModal = () =>
    openModal({
      id: "city",
      component: <CityModal />,
      closeModal: () => closeModal("city")
    });

  const onSubmit = async data => {
    try {
      if (props.item) {
        await putRoute({ ...data, id: props.item.id });
      } else {
        await postRoute(data);
      }
      closeModal("route");
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
              <Label>Start city</Label>
              <InputGroup>
                <Input
                  type="select"
                  name="startCityId"
                  value={startCityId}
                  onChange={e => setStartCityId(e.target.value)}
                  innerRef={register}
                >
                  <option value={""}>None</option>
                  {cities.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Input>
                <InputGroupAddon addonType="append">
                  <Button
                    color="info"
                    type="button"
                    onClick={() => openCityModal()}
                  >
                    Add city
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label>End city</Label>
              <InputGroup>
                <Input
                  type="select"
                  name="endCityId"
                  value={endCityId}
                  onChange={e => setEndCityId(e.target.value)}
                  innerRef={register}
                >
                  <option value={""}>None</option>
                  {cities.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Input>
                <InputGroupAddon addonType="append">
                  <Button
                    color="info"
                    type="button"
                    onClick={() => openCityModal()}
                  >
                    Add city
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label>Price</Label>
              <Input
                name="price"
                type="number"
                placeholder="Enter price"
                defaultValue={price}
                innerRef={register}
              />{" "}
              RON
            </FormGroup>
            <FormGroup>
              <Label>Distance</Label>
              <Input
                name="distance"
                type="number"
                placeholder="Enter distance"
                defaultValue={distance}
                innerRef={register}
              />{" "}
              km
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

export default RouteModal;
