import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import { Table, Alert, Button, ButtonGroup } from "reactstrap";

import AuthLayout from "../layouts/AuthLayout";

import CityModal from "../containers/CityModal";

function Cities() {
  const cities = useStoreState(state => state.city.cities);
  const getCities = useStoreActions(actions => actions.city.getCities);
  const deleteCity = useStoreActions(actions => actions.city.deleteCity);
  const openModal = useStoreActions(actions => actions.modal.openModal);
  const closeModal = useStoreActions(actions => actions.modal.closeModal);

  const editEntity = item => {
    openModal({
      id: "city",
      component: <CityModal item={item} />,
      closeModal: () => closeModal("city")
    });
  };

  const deleteEntity = async id => {
    try {
      await deleteCity(id);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCities();
  }, [getCities]);
  let render = null;
  if (cities.length) {
    const tableHeader = Object.keys(cities[0]).map(item => (
      <th key={item}>{item}</th>
    ));
    const tableBody = cities.map(item => (
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
    ));

    render = (
      <Table>
        <thead>
          <tr>
            {tableHeader}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </Table>
    );
  } else {
    render = <Alert color="dark">No cities have been added yet.</Alert>;
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
                  id: "city",
                  component: <CityModal />,
                  closeModal: () => closeModal("city")
                })
              }
            >
              Add city
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

export default Cities;
