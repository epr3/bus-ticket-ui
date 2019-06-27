import React, { useEffect, useMemo } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import { Table, Alert, Button, ButtonGroup } from "reactstrap";

import AuthLayout from "../layouts/AuthLayout";

import RouteModal from "../containers/RouteModal";

function RoutesView() {
  const routes = useStoreState(state => state.route.routes);
  const getRoutes = useStoreActions(actions => actions.route.getRoutes);
  const deleteRoute = useStoreActions(actions => actions.route.deleteRoute);
  const openModal = useStoreActions(actions => actions.modal.openModal);
  const closeModal = useStoreActions(actions => actions.modal.closeModal);

  const tableRoutes = useMemo(
    () =>
      routes.map(item => ({
        id: item.id,
        price: item.price,
        distance: item.distance,
        startCityId: item.startCity.id,
        endCityId: item.endCity.id
      })),
    [routes]
  );

  const editEntity = item => {
    openModal({
      id: "route",
      component: <RouteModal item={item} />,
      closeModal: () => closeModal("route")
    });
  };

  const deleteEntity = async id => {
    try {
      await deleteRoute(id);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getRoutes();
  }, [getRoutes]);

  let render = null;
  if (tableRoutes.length) {
    const tableHeader = Object.keys(tableRoutes[0]).map(item => (
      <th key={item}>{item}</th>
    ));
    const tableBody = tableRoutes.map(item => (
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
    render = <Alert color="dark">No routes have been added yet.</Alert>;
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
                  id: "route",
                  component: <RouteModal />,
                  closeModal: () => closeModal("route")
                })
              }
            >
              Add route
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

export default RoutesView;
