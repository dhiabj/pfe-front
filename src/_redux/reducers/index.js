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
import values from "./values";
import accountCode from "./accountCode";
import market from "./market";
import profits from "./profits";

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
  values,
  accountCode,
  market,
  profits,
});

export default rootReducer;
