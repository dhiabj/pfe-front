import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteMvtUploads } from "../../../_redux/actions/mouvements";

const DeleteMvtFile = ({ handleClose, show, id }) => {
  const dispatch = useDispatch();
  const deleteMvt = (id) => {
    dispatch(deleteMvtUploads(id));
    handleClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Êtes-vous sûr?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Êtes-vous sûr de vouloir supprimer ce fichier?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="danger" onClick={() => deleteMvt(id)}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteMvtFile;
