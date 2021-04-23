import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../../_redux/actions/categoriesAvoir";

const DeleteCategory = ({ handleClose, show, id }) => {
  const dispatch = useDispatch();
  const deleteCc = (id) => {
    dispatch(deleteCategory(id));
    handleClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Êtes-vous sûr?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer ce catégorie d'avoir?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="danger" onClick={() => deleteCc(id)}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteCategory;
