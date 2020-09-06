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

export const getAllOrders = () => {
    const action = {successStatus:200,actionName:'GetAllOrders'}

    return reqHandler('/orders','GET',undefined,action);
};

export const createOrder = (payload) => {
    const action = {successStatus:201,actionName:'CreateOrder'}
    console.log(payload);
    return reqHandler('/orders','POST',payload,action);
}
