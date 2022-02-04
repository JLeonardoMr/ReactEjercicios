import { combineReducers } from "redux";
import ProductRedux from "./productRedux";

const reducer = combineReducers({
    shoppingRedux: ProductRedux
});

export default reducer;