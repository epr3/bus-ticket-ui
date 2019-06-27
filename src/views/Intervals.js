import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import { Table, Alert, Button, ButtonGroup } from "reactstrap";

import AuthLayout from "../layouts/AuthLayout";

import IntervalModal from "../containers/IntervalModal";

function Intervals() {
  const intervals = useStoreState(state => state.interval.intervals);
  const getIntervals = useStoreActions(
    actions => actions.interval.getIntervals
  );
  const deleteInterval = useStoreActions(
    actions => actions.interval.deleteInterval
  );
  const openModal = useStoreActions(actions => actions.modal.openModal);
  const closeModal = useStoreActions(actions => actions.modal.closeModal);

  const editEntity = item => {
    openModal({
      id: "interval",
      component: <IntervalModal item={item} />,
      closeModal: () => closeModal("interval")
    });
  };

  const deleteEntity = async id => {
    try {
      await deleteInterval(id);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getIntervals();
  }, [getIntervals]);

  let render = null;
  if (intervals.length) {
    const tableHeader = Object.keys(intervals[0]).map(item => (
      <th key={item}>{item}</th>
    ));
    const tableBody = intervals.map(item => (
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
                  id: "interval",
                  component: <IntervalModal />,
                  closeModal: () => closeModal("interval")
                })
              }
            >
              Add interval
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

export default Intervals;
