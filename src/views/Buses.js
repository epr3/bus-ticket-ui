import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import { Table, Alert, Button } from "reactstrap";

import AuthLayout from "../layouts/AuthLayout";

import BusModal from "../containers/BusModal";

function Buses() {
  const buses = useStoreState(state => state.bus.buses);
  const getBuses = useStoreActions(actions => actions.bus.getBuses);
  const openModal = useStoreActions(actions => actions.modal.openModal);
  const closeModal = useStoreActions(actions => actions.modal.closeModal);

  useEffect(() => {
    getBuses();
  }, [getBuses]);
  let render = null;
  if (buses.length) {
    const tableHeader = Object.keys(buses[0]).map(item => (
      <th key={item}>item</th>
    ));
    render = (
      <Table>
        <thead>
          <tr>{tableHeader}</tr>
        </thead>
        <tbody>
          <tr>
            <td>Altceva</td>
          </tr>
        </tbody>
      </Table>
    );
  } else {
    render = <Alert color="dark">No buses have been added yet.</Alert>;
  }

  return (
    <AuthLayout>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Button
              color="primary"
              onClick={() =>
                openModal({
                  id: "bus",
                  component: <BusModal />,
                  closeModal: () => closeModal("bus")
                })
              }
            >
              Add bus
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">{render}</div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Buses;
