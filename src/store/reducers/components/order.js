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
                fetchError: Action
            }
        case 'CreateOrder_Error':
            return state = {
                ...state,
                fetchError: [...state.orders,Action]
            }
        case 'GetAllOrders_Success':
            return state = {
                fetchError: null,
                orders: Action
            }
        case 'AddOrder':
            return state={
                ...state,
                orders:[...state.orders,Action]
            }
        case 'UpdateOrder_Error':
            return state = {
                ...state,
                fetchError:Action,
            }
        case 'UpdateOrder_Success':
            const newOrders = state.orders.filter(order=> order.id !== Action.id)
            return state = {
                ...state,
                orders:[...newOrders,Action],
            }
        default:
            return state
    }
}

export default orderReducer
