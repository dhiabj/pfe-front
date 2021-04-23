import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteOperation } from "../../../_redux/actions/operationCode";

const DeleteOperation = ({ handleClose, show, id }) => {
  const dispatch = useDispatch();
  const deleteOc = (id) => {
    dispatch(deleteOperation(id));
    handleClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Êtes-vous sûr?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer ce code d'opération?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="danger" onClick={() => deleteOc(id)}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteOperation;
