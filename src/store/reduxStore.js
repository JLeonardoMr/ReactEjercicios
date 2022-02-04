import { createStore } from "redux";
import reducer from "../reducer/redux";

const store = createStore(reducer);

store.subscribe(()=>console.log(store));

export default store;