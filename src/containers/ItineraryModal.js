import React, { useState, useEffect } from "react";
import useForm from "react-hook-form";
import { useStoreActions, useStoreState } from "easy-peasy";

import { DateTime } from "luxon";

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

import BusModal from "./BusModal";
import RouteModal from "./RouteModal";
import IntervalModal from "./IntervalModal";

function ItineraryModal(props) {
  const { register, handleSubmit } = useForm();
  const [busId, setBusId] = useState((props.item && props.item.bus.id) || "");
  const [routeId, setRouteId] = useState(
    (props.item && props.item.route.id) || ""
  );
  const [intervalId, setIntervalId] = useState(
    (props.item && props.item.interval.id) || ""
  );
  const buses = useStoreState(state => state.bus.buses);
  const routes = useStoreState(state => state.route.routes);
  const intervals = useStoreState(state => state.interval.intervals);

  const postItinerary = useStoreActions(
    actions => actions.itinerary.postItinerary
  );
  const putItinerary = useStoreActions(
    actions => actions.itinerary.putItinerary
  );
  const openModal = useStoreActions(actions => actions.modal.openModal);
  const closeModal = useStoreActions(actions => actions.modal.closeModal);
  const getBuses = useStoreActions(actions => actions.bus.getBuses);
  const getRoutes = useStoreActions(actions => actions.route.getRoutes);
  const getIntervals = useStoreActions(
    actions => actions.interval.getIntervals
  );

  useEffect(() => {
    getBuses();
  }, [getBuses]);

  useEffect(() => {
    getRoutes();
  }, [getRoutes]);

  useEffect(() => {
    getIntervals();
  }, [getIntervals]);

  const openBusModal = () =>
    openModal({
      id: "bus",
      component: <BusModal />,
      closeModal: () => closeModal("bus")
    });

  const openIntervalModal = () =>
    openModal({
      id: "interval",
      component: <IntervalModal />,
      closeModal: () => closeModal("interval")
    });

  const openRouteModal = () =>
    openModal({
      id: "route",
      component: <RouteModal />,
      closeModal: () => closeModal("route")
    });

  const onSubmit = async data => {
    try {
      if (props.item) {
        await putItinerary({ ...data, id: props.item.id });
      } else {
        await postItinerary(data);
      }
      closeModal("itinerary");
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
              <Label>Bus</Label>
              <InputGroup>
                <Input
                  type="select"
                  name="busId"
                  value={busId}
                  onChange={e => setBusId(e.target.value)}
                  innerRef={register}
                >
                  <option value={""}>None</option>
                  {buses.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.plateNo}
                    </option>
                  ))}
                </Input>
                <InputGroupAddon addonType="append">
                  <Button
                    color="info"
                    type="button"
                    onClick={() => openBusModal()}
                  >
                    Add bus
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label>Route</Label>
              <InputGroup>
                <Input
                  type="select"
                  name="routeId"
                  value={routeId}
                  onChange={e => setRouteId(e.target.value)}
                  innerRef={register}
                >
                  <option value={""}>None</option>
                  {routes.map(item => (
                    <option key={item.id} value={item.id}>
                      {`${item.startCity.name}-${item.endCity.name}`}
                    </option>
                  ))}
                </Input>
                <InputGroupAddon addonType="append">
                  <Button
                    color="info"
                    type="button"
                    onClick={() => openRouteModal()}
                  >
                    Add route
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label>Interval</Label>
              <InputGroup>
                <Input
                  type="select"
                  name="intervalId"
                  value={intervalId}
                  onChange={e => setIntervalId(e.target.value)}
                  innerRef={register}
                >
                  <option value={""}>None</option>
                  {intervals.map(item => (
                    <option key={item.id} value={item.id}>
                      {`${DateTime.fromISO(item.intervalStart).toFormat(
                        "HH:mm"
                      )}-${DateTime.fromISO(item.intervalEnd).toFormat(
                        "HH:mm"
                      )}`}
                    </option>
                  ))}
                </Input>
                <InputGroupAddon addonType="append">
                  <Button
                    color="info"
                    type="button"
                    onClick={() => openIntervalModal()}
                  >
                    Add interval
                  </Button>
                </InputGroupAddon>
              </InputGroup>
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

export default ItineraryModal;
