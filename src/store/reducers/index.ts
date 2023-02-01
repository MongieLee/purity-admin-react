import userReducer from "./authReducer";
import {CombinedState, combineReducers, Reducer} from "redux";
import {RootState} from "@/store";
import menuReducer from "@/store/reducers/menuReducer";

const reducers = combineReducers({
  auth: userReducer,
  permission: menuReducer
});
export default reducers;


