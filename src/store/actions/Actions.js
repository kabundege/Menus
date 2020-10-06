import '../../utils/Http';
import { reqHandler } from '../../utils/Http';

export const authAction = (payload) => {
    const action = {successStatus:200,actionName:'Login'}
    return reqHandler('/login','POST',payload,action);
};

export const tokenAuthAction = (token) => {
    const action = {successStatus:200,actionName:'Login'}
    
    return reqHandler(`/login/${token}`,'GET',undefined,action);
};

export const getAllItems = () => {
    const action = {successStatus:200,actionName:'GetAllItems'}

    return reqHandler('/items','GET',undefined,action);
};

export const getOneOrder = (id) => {
    const action = {successStatus:200,actionName:'GetOneOrder'}

    return reqHandler(`/orders/${id}`,'GET',undefined,action);
};

export const getAllOrders = () => {
    const action = {successStatus:200,actionName:'GetAllOrders'}

    return reqHandler('/orders','GET',undefined,action);
};

export const createOrder = (payload) => {
    const action = {successStatus:201,actionName:'CreateOrder'}

    return reqHandler('/orders','POST',payload,action);
};

export const updateOrder = (id,payload) => {
    const action = {successStatus:200,actionName:'UpdateOrder'}

    return reqHandler(`/orders/${id}`,'PATCH',payload,action);
};

export const createItem = (payload) => {
    const action = {successStatus:201,actionName:'CreateItem'}

    return reqHandler('/items','POST',payload,action);
};

export const deleteItem = (id) => {
    const action = {successStatus:200,actionName:'DeleteItem'}

    return reqHandler(`/items/${id}`,'DELETE',undefined,action);
};

export const CreateUser = (payload) => {
    const action = {successStatus:201,actionName:'CreateUser'}

    return reqHandler(`/createUser`,'POST',payload,action);
};

export const deleteOrder = (id) => {
    const action = {successStatus:200,actionName:'DeleteOrder'};

    return reqHandler(`/orders/${id}`,'DELETE',undefined,action);
};

export const AllProducts = () => {
    const action = {successStatus:200,actionName:'GetAllProducts'};

    return reqHandler(`/products`,'GET',undefined,action);
};

export const OneProduct = (id) => {
    const action = {successStatus:200,actionName:'GetOneProduct'};

    return reqHandler(`/products/${id}`,'GET',undefined,action);
};

export const createProduct = (payload) => {
    const action = {successStatus:200,actionName:'createProduct'};

    return reqHandler(`/products`,'POST',payload,action);
};

export const updateProduct = (id,payload) => {
    const action = {successStatus:200,actionName:'UpdateProduct'};

    return reqHandler(`/products/${id}`,'PATCH',payload,action);
};

export const deleteProduct = (id) => {
    const action = {successStatus:200,actionName:'DeleteProduct'};

    return reqHandler(`/products/${id}`,'DELETE',undefined,action);
};

export const AllTrans = () => {
    const action = {successStatus:200,actionName:'GetAllTrans'};

    return reqHandler(`/transactions`,'GET',undefined,action);
};
