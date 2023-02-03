import {combineReducers} from "redux";
import userReducer from "@/store/reducers/authReducer";
import menuReducer from "@/store/reducers/menuReducer";
import tabsReducer from "@/store/reducers/tabsReducer";

const reducers = combineReducers({
  auth: userReducer,
  permission: menuReducer,
  tabs: tabsReducer
});
export default reducers;


