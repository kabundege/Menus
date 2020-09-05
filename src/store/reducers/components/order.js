const initState = {
    orders:[],
    fetchError:null,
}

const orderReducer = (state = initState,action) => {
    const Action  = action.action;
    switch(action.type){
        case 'GetAllOrders_Error':
            return state = {
                ...state,
                fetchError: Action,
            }
        case 'GetAllOrders_Success':
            return state = {
                ...state,
                fetchError: null,
                orders: Action
            }
        default:
            return state
    }
}

export default orderReducer
