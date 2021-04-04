import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoriesTable from "../../../containers/Tables/CategoriesTable";
import { getCategories } from "../../../_redux/actions/categoriesAvoir";

const CategoriesAvoir = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const categories = useSelector((state) => state.categoriesAvoir.data);
  return (
    <div>
      <CategoriesTable categories={categories} />
    </div>
  );
};

export default CategoriesAvoir;
