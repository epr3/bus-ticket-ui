import React, { useEffect, useMemo } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import { DateTime } from "luxon";

import { Table, Alert, Button, ButtonGroup } from "reactstrap";

import ItineraryModal from "./ItineraryModal";

function AdminHome() {
  const itineraries = useStoreState(state => state.itinerary.itineraries);
  const getItineraries = useStoreActions(
    actions => actions.itinerary.getItineraries
  );
  const deleteItinerary = useStoreActions(
    actions => actions.itinerary.deleteItinerary
  );

  const openModal = useStoreActions(actions => actions.modal.openModal);
  const closeModal = useStoreActions(actions => actions.modal.closeModal);

  const computedItineraries = useMemo(
    () =>
      itineraries.map(item => ({
        id: item.id,
        bus: `${item.bus.busMake} ${item.bus.busModel}`,
        interval: `${DateTime.fromISO(item.interval.intervalStart).toFormat(
          "HH:mm"
        )}-${DateTime.fromISO(item.interval.intervalEnd).toFormat("HH:mm")}`,
        route: `${item.route.startCity.name}-${item.route.endCity.name}`
      })),
    [itineraries]
  );

  useEffect(() => {
    getItineraries();
  }, [getItineraries]);

  const editEntity = item => {
    openModal({
      id: "itinerary",
      component: (
        <ItineraryModal
          item={itineraries.find(itinerary => itinerary.id === item.id)}
        />
      ),
      closeModal: () => closeModal("itinerary")
    });
  };

  const deleteEntity = async id => {
    try {
      await deleteItinerary(id);
    } catch (e) {
      console.error(e);
    }
  };

  let render = null;
  if (itineraries.length) {
    const tableHeader = Object.keys(computedItineraries[0]).map(item => (
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
          {computedItineraries.map(item => (
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
