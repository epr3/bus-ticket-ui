import React, { useState } from "react";
import useForm from "react-hook-form";
import { useStoreActions } from "easy-peasy";

import { DateTime } from "luxon";

import {
  ModalBody,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Button
} from "reactstrap";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function IntervalModal(props) {
  const { handleSubmit } = useForm();
  const [intervalStart, setIntervalStart] = useState(
    (props.item && DateTime.fromISO(props.item.intervalStart).toJSDate()) ||
      new Date()
  );
  const [intervalEnd, setIntervalEnd] = useState(
    (props.item && DateTime.fromISO(props.item.intervalEnd).toJSDate()) ||
      new Date()
  );

  const postInterval = useStoreActions(
    actions => actions.interval.postInterval
  );
  const putInterval = useStoreActions(actions => actions.interval.putInterval);
  const closeModal = useStoreActions(actions => actions.modal.closeModal);

  const onSubmit = async () => {
    const data = {
      intervalStart: DateTime.fromJSDate(intervalStart).toISOTime(),
      intervalEnd: DateTime.fromJSDate(intervalEnd).toISOTime()
    };
    try {
      if (props.item) {
        await putInterval({ ...data, id: props.item.id });
      } else {
        await postInterval(data);
      }
      closeModal("interval");
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
              <Label>Start interval</Label>
              <DatePicker
                selected={intervalStart}
                onChange={setIntervalStart}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="HH:MM"
                timeCaption="Time"
              />
            </FormGroup>
            <FormGroup>
              <Label>End interval</Label>
              <DatePicker
                selected={intervalEnd}
                onChange={setIntervalEnd}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="HH:MM"
                timeCaption="Time"
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

export default IntervalModal;
