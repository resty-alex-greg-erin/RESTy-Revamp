import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reporter from "./middleware/reporter.js";
import thunk from "redux-thunk";

import reducer from "./reducer.js";

let reducers = combineReducers({
  records: reducer
});

const store = () =>
  createStore(reducers, composeWithDevTools(applyMiddleware(reporter, thunk)));
export default store;
