export const TYPES = {
    PRODUCT_ADD: "product - Add",
    PRODUCT_ONE_DELETE: "product - One - Delete",
    PRODUCT_DELETE: "product - Delete",
    PRODUCT_SHOW: "product - Show",
    PRODUCT_CLEAR: "product - Clear",
}

export const productAdd = (product) => ({
    type: TYPES.PRODUCT_ADD,
    payload: product
})
export const productOneDelete = (product) => ({
    type: TYPES.PRODUCT_ONE_DELETE,
    payload: product
})
export const productDelete = (product) => ({
    type: TYPES.PRODUCT_DELETE,
    payload: product
})
export const productShow = (product) => ({
    type: TYPES.PRODUCT_SHOW,
    payload: product
})
export const productClear = () => ({
    type: TYPES.PRODUCT_CLEAR
})