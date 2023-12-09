import { combineReducers } from "redux";

import productReducer from "./product/reducer";
import alertReducer from "./alert/reducer";

const rootReducer = combineReducers({ productReducer, alertReducer });

export default rootReducer;
