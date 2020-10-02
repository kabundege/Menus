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
        case 'GetOneOrder_Success':
            return state = {
                fetchError: null,
                orders: Action
            }
        case 'GetAllOrders_Success':
            return state = {
                fetchError: null,
                orders: Action
            }
        case 'DeleteOrder_Success':
            return state = {
                fetchError:null,
                orders: state.orders.filter(order => parseInt(order.id) !== parseInt(Action))
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
            return state = {
                ...state,
                orders:Action,
            }
        default:
            return state
    }
}

export default orderReducer
