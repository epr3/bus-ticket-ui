import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import { Table, Alert, Button } from "reactstrap";

import ItineraryModal from "./ItineraryModal";

function AdminHome() {
  const itineraries = useStoreState(state => state.itinerary.itineraries);
  const getItineraries = useStoreActions(
    actions => actions.itinerary.getItineraries
  );
  const openModal = useStoreActions(actions => actions.modal.openModal);
  const closeModal = useStoreActions(actions => actions.modal.closeModal);

  useEffect(() => {
    getItineraries();
  }, [getItineraries]);
  let render = null;
  if (itineraries.length) {
    const tableHeader = Object.keys(itineraries[0]).map(item => (
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
    render = <Alert color="dark">No itineraries have been added yet.</Alert>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <Button
            color="primary"
            onClick={() =>
              openModal({
                id: "itinerary",
                component: <ItineraryModal />,
                closeModal: () => closeModal("itinerary")
              })
            }
          >
            Add itinerary
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">{render}</div>
      </div>
    </div>
  );
}

export default AdminHome;
