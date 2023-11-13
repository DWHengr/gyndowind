import {legacy_createStore as createStore, combineReducers} from "redux";
import * as user from "./user/reducer";

let store = createStore(
    combineReducers({...user})
);

export default store;
