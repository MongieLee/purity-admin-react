import {legacy_createStore as createStore} from "redux";
import reducer from "@/store/reducers";

export type RootState = ReturnType<typeof reducer>

const store = createStore(reducer);
console.log(store);
console.log(store.getState());
export default store;