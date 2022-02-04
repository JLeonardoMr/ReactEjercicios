import { PRODUCT_ADD, PRODUCT_CLEAR, PRODUCT_DELETE, PRODUCT_ONE_DELETE, PRODUCT_SHOW } from "../action/reduxAction";

export const initialProductState = {
    products: [
        { id: 1, title: "Product #1" },
        { id: 2, title: "Product #2" },
        { id: 3, title: "Product #3" },
        { id: 4, title: "Product #4" },
        { id: 5, title: "Product #5" },
        { id: 6, title: "Product #6" },
        { id: 7, title: "Product #7" },
        { id: 8, title: "Product #8" },
        { id: 9, title: "Product #9" },
        { id: 10, title: "Product #10" },
        { id: 11, title: "Product #11" },
        { id: 12, title: "Product #12" },
        { id: 13, title: "Product #13" },
        { id: 14, title: "Product #14" },
        { id: 15, title: "Product #15" },
        { id: 16, title: "Product #16" },
        { id: 17, title: "Product #17" },
        { id: 18, title: "Product #18" },
        { id: 19, title: "Product #19" },
        { id: 20, title: "Product #20" },
        { id: 21, title: "Product #21" },
        { id: 22, title: "Product #22" },
        { id: 23, title: "Product #23" },
        { id: 24, title: "Product #24" },
        { id: 25, title: "Product #25" },
        { id: 26, title: "Product #26" },
        { id: 27, title: "Product #27" },
        { id: 28, title: "Product #28" },
        { id: 29, title: "Product #29" },
        { id: 30, title: "Product #30" },
        { id: 31, title: "Product #31" },
        { id: 32, title: "Product #32" },
        { id: 33, title: "Product #33" },
        { id: 34, title: "Product #34" },
        { id: 35, title: "Product #35" },
        { id: 36, title: "Product #36" },
        { id: 37, title: "Product #37" },
        { id: 38, title: "Product #38" },
        { id: 39, title: "Product #39" },
        { id: 40, title: "Product #40" },
        { id: 41, title: "Product #41" },
        { id: 42, title: "Product #42" },
        { id: 43, title: "Product #43" },
        { id: 44, title: "Product #44" },
        { id: 45, title: "Product #45" },
        { id: 46, title: "Product #46" },
        { id: 47, title: "Product #47" },
        { id: 48, title: "Product #48" },
        { id: 49, title: "Product #49" },
        { id: 50, title: "Product #50" },
    ],
    cart: [],
    active: { id: 2, title: "Product #2" }
}
export default function ProductRedux(state = initialProductState, action) {
    switch (action.type) {
        case PRODUCT_ADD:

            return;
        case PRODUCT_ONE_DELETE:

            return;
        case PRODUCT_DELETE:

            return;
        case PRODUCT_SHOW:

            return;
        case PRODUCT_CLEAR:

            return;

        default:
            return state;
    }
}