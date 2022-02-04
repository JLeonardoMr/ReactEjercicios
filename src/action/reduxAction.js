export const PRODUCT_ADD = "product - Add";
export const PRODUCT_ONE_DELETE = "product - One - Delete";
export const PRODUCT_DELETE = "product - Delete";
export const PRODUCT_SHOW = "product - Show";
export const PRODUCT_CLEAR = "product - Clear";

export const productAdd = (product) => ({ 
    type: PRODUCT_ADD, 
    payload: product })
export const productOneDelete = (product) => ({ 
    type: PRODUCT_ONE_DELETE, 
    payload: product })
export const productDelete = (product) => ({ 
    type: PRODUCT_DELETE, 
    payload: product })
export const productShow = (product) => ({ 
    type: PRODUCT_SHOW, 
    payload: product })
export const productClear = () => ({ 
    type: PRODUCT_CLEAR})