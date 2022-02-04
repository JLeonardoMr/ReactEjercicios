import typeActionProduct from "../action/productAction";

export function ProductReducer(state, action) {
    switch (action.type) {
        case typeActionProduct.productShow:
            return {
                ...state,
                active: action.payload
            }
        case typeActionProduct.productAdd: {
            const cartProduct = state.cart.find(
                el => el.id === action.payload.id
            )
            return cartProduct
                ? {
                    ...state,
                    cart: state.cart.map(el =>
                        el.id === action.payload.id
                            ? { ...el, quantity: el.quantity + 1 }
                            : el
                    )
                }
                : {
                    ...state,
                    cart: [
                        ...state.cart,
                        { ...action.payload, quantity: 1 }
                    ]
                }
        }
        case typeActionProduct.productRemove: {
            const productDelete = state.cart.find(
                el => el.id === action.payload
            )
            return productDelete.quantity > 1
                ? {
                    ...state,
                    cart: state.cart.map(el =>
                        el.id === action.payload
                            ? { ...el, quantity: el.quantity - 1 }
                            : el
                    )
                }
                : {
                    ...state,
                    cart: state.cart.filter(el => el.id !== action.payload)
                }
        }
        case typeActionProduct.productRemoveAll:
            return {
                ...state,
                cart: state.cart.filter(el => el.id !== action.payload)
            }
        default:
            return state;
    }
}