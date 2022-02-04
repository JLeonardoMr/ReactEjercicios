import { TYPES } from "../action/reduxAction";

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
        case TYPES.PRODUCT_ADD:
            //! Busco el producto que se me manda en el action
            const product = state.cart.find(el => el.id === action.payload.id)
            //! Pregunto mediante un operador ternario si el producto buscado existe
            return product
                //! Si el producto existe
                ? {
                    //! Copio el estado original y le agrego el "cart"
                    ...state,
                    //! Recorro el cart en el estado y si este lo encuenta
                    cart: state.cart.map(el =>
                        el.id === action.payload.id
                            //! Sumara la cantidad + 1
                            ? { ...el, quantity: el.quantity + 1 }
                            : el
                    )
                }
                //! Si el producto no existe
                : {
                    //! Copio el estado original y le agrego el "cart" como un array
                    ...state,
                    cart: [
                        //! Copio lo que estaba dentro de cart y como no existe el item
                        ...state.cart,
                        {
                            //! Lo agrego como objeto mas las cantidad en 1
                            ...action.payload,
                            quantity: 1
                        }
                    ]
                };
        case TYPES.PRODUCT_ONE_DELETE:
            //! En el stado demtro de cart 
            //! Busco el id del producto que se me manda en el action
            const productDelete = state.cart.find(el => el.id === action.payload);
            //! Pregunto, si el quantity es mayor a 1
            return productDelete.quantity > 1
                //! Si quantity es mayor a 1 
                ? {
                    //! Hago una copia del estado y le agrego cart
                    ...state,
                    //! Recorro el cart en el estado y si este lo encuenta
                    cart: state.cart.map(el =>
                        el.id === action.payload
                            //! Restara la cantida - 1
                            ? { ...el, quantity: el.quantity - 1 }
                            : el
                    )
                }
                //! Si es menor a 1
                : {
                    ...state,
                    //! filtra el item
                    cart: state.cart.filter(el => el.id !== action.payload)
                };
        case TYPES.PRODUCT_DELETE:
            //! Creo una copia del estado
            return {
                ...state,
                //! Filtro el producto del cart
                cart: state.cart.filter(el => el.id !== action.payload)
            };
        case TYPES.PRODUCT_SHOW:
            //! Creo una copia del estado
            return {
                ...state,
                //! Agrego a active lo que viene en el action
                active: action.payload
            };
        case TYPES.PRODUCT_CLEAR:
            //! Creo una copia del estado
            return {
                ...state,
                //! Agrego el cart con un array vacio
                cart: []
            };

        default:
            return state;
    }
}