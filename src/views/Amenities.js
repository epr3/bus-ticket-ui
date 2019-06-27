import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import { Table, Alert, Button, ButtonGroup } from "reactstrap";

import AuthLayout from "../layouts/AuthLayout";

import AmenityModal from "../containers/AmenityModal";

function Amenities() {
  const amenities = useStoreState(state => state.amenity.amenities);
  const getAmenities = useStoreActions(actions => actions.amenity.getAmenities);
  const deleteAmenity = useStoreActions(
    actions => actions.amenity.deleteAmenity
  );
  const openModal = useStoreActions(actions => actions.modal.openModal);
  const closeModal = useStoreActions(actions => actions.modal.closeModal);

  const editEntity = item => {
    openModal({
      id: "amenity",
      component: <AmenityModal item={item} />,
      closeModal: () => closeModal("amenity")
    });
  };

  const deleteEntity = async id => {
    try {
      await deleteAmenity(id);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAmenities();
  }, [getAmenities]);
  let render = null;
  if (amenities.length) {
    const tableHeader = Object.keys(amenities[0]).map(item => (
      <th key={item}>{item}</th>
    ));
    const tableBody = amenities.map(item => (
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
    render = <Alert color="dark">No amenities have been added yet.</Alert>;
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
                  id: "amenity",
                  component: <AmenityModal />,
                  closeModal: () => closeModal("amenity")
                })
              }
            >
              Add amenity
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

export default Amenities;
