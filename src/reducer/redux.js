import { combineReducers } from "redux";
import ProductRedux from "./productRedux";
const reducer = combineReducers({
    shopping: ProductRedux
});

export default reducer;