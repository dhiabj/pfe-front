import * as redux from "redux";
import loading from "./loading";
import auth from "./auth";
import stocks from "./stocks";
import mouvements from "./mouvements";
import fileUpload from "./fileUpload";
import memberType from "./memberType";
import member from "./member";
import operationCode from "./operationCode";
import categoriesAvoir from "./categoriesAvoir";
import accountTypes from "./accountTypes";

const rootReducer = redux.combineReducers({
  loading,
  auth,
  stocks,
  mouvements,
  fileUpload,
  memberType,
  member,
  operationCode,
  categoriesAvoir,
  accountTypes,
});

export default rootReducer;
