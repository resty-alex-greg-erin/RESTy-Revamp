import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reporter from "./middleware/reporter.js";
import thunk from "redux-thunk";

import historyReducer from "../components/resty/reducer.js";

let reducers = combineReducers({
  history: historyReducer
});

const store = () =>
  createStore(reducers, composeWithDevTools(applyMiddleware(reporter, thunk)));
export default store;
