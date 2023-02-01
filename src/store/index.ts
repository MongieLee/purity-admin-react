import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import reducer from "@/store/reducers";
import thunk from "redux-thunk";

export type RootState = ReturnType<typeof reducer>

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
