import * as redux from "redux";
import loading from "./loading";
import auth from "./auth";
import stocks from "./stocks";
import mouvements from "./mouvements";
import fileUpload from "./fileUpload";

const rootReducer = redux.combineReducers({
  loading,
  auth,
  stocks,
  mouvements,
  fileUpload,
});

export default rootReducer;
