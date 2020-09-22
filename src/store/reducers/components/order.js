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
            let foundOrder=false;
            for(const order of state.orders){
                if(order.id === Action.id)
                foundOrder=true
            }
            return state={
                ...state,
                orders: foundOrder ? state.orders : [Action,...state.orders]
            }
        case 'UpdateOrder_Error':
            return state = {
                ...state,
                fetchError:Action,
            }
        case 'UpdateOrder_Success':
            const newOrders = state.orders.map(order=> {
                if(order.id === Action.id)
                    return Action
                    return order
            })
            return state = {
                ...state,
                orders:newOrders,
            }
        default:
            return state
    }
}

export default orderReducer
