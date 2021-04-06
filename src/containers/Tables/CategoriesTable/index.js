import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "../../../css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategories,
} from "../../../_redux/actions/categoriesAvoir";
import AddCategory from "../../Modals/Sticodevam/AddCategory";
import EditCategory from "../../Modals/Sticodevam/EditCategory";
const CategoriesTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const categories = useSelector((state) => state.categoriesAvoir.data);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [id, setId] = useState();

  const openSelectedCategoryModal = (id) => {
    setEditModalShow(true);
    setId(id);
  };

  const deleteCc = (id) => {
    dispatch(deleteCategory(id));
  };

  const columns = [
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => deleteCc(row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => openSelectedCategoryModal(row.id)}>
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
    {
      name: "Code Catégorie d'avoir",
      selector: "CategoryCode",
      sortable: true,
    },
    {
      name: "Libellé Catégorie d'avoir",
      cell: (row) => <div>{row.CategoryLabel ? row.CategoryLabel : "-"}</div>,
    },
  ];

  const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        ref={ref}
        {...rest}
      />
      <label className="custom-control-label" onClick={onClick} />
    </div>
  ));

  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  return (
    <>
      <div className="card">
        <DataTable
          title="Liste des catégories d'avoir"
          responsive
          overflowY
          overflowYOffset="150px"
          columns={columns}
          data={categories}
          defaultSortField="Code Catégorie d'avoir"
          pagination
          selectableRows
          selectableRowsComponent={BootyCheckbox}
        />
      </div>
      <div style={style}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setAddModalShow(true)}>
          <AddIcon />
        </Fab>
      </div>
      <AddCategory show={addModalShow} onHide={() => setAddModalShow(false)} />
      <EditCategory
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        categories={categories}
        id={id}
      />
    </>
  );
};

export default CategoriesTable;
