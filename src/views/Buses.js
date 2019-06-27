import React, { useEffect, useMemo } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import { Table, Alert, Button, ButtonGroup } from "reactstrap";

import AuthLayout from "../layouts/AuthLayout";

import BusModal from "../containers/BusModal";

function Buses() {
  const buses = useStoreState(state => state.bus.buses);
  const getBuses = useStoreActions(actions => actions.bus.getBuses);
  const deleteBus = useStoreActions(actions => actions.bus.deleteBus);

  const openModal = useStoreActions(actions => actions.modal.openModal);
  const closeModal = useStoreActions(actions => actions.modal.closeModal);

  const computedBuses = useMemo(
    () =>
      buses.map(item => ({
        ...item,
        driver: `${item.driver.name} ${item.driver.surname}`,
        amenities: item.amenities.reduce(
          (acc, val) => (acc += ` ${val.name}`),
          ""
        )
      })),
    [buses]
  );

  const editEntity = item => {
    openModal({
      id: "bus",
      component: <BusModal item={buses.find(bus => bus.id === item.id)} />,
      closeModal: () => closeModal("bus")
    });
  };

  const deleteEntity = async id => {
    try {
      await deleteBus(id);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getBuses();
  }, [getBuses]);
  let render = null;
  if (buses.length) {
    const tableHeader = Object.keys(buses[0]).map(item => (
      <th key={item}>{item}</th>
    ));
    render = (
      <Table>
        <thead>
          <tr>
            {tableHeader}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {computedBuses.map(item => (
            <tr key={item.id}>
              {Object.values(item).map((cell, index) => (
                <td key={`cell-${item.id}-${index}`}>{cell}</td>
              ))}
              <td>
                <ButtonGroup>
                  <Button color="info" onClick={() => editEntity(item)}>
                    Edit
                  </Button>
                  <Button color="danger" onClick={() => deleteEntity(item.id)}>
                    Delete
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
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
