const initState = {
    orders:[],
    fetchError:null,
    loading:false
}

const orderReducer = (state = initState,action) => {
    const Action  = action.action;
    switch(action.type){
        case'Loading':
        return state = {
            ...state,
            loading:true
        }
        case 'GetAllOrders_Error':
            return state = {
                ...state,
                fetchError: Action,
                loading:false
            }
        case 'CreateOrder_Error':
            return state = {
                ...state,
                fetchError: [...state.orders,Action],
                loading:false
            }
        case 'GetAllOrders_Success':
            return state = {
                fetchError: null,
                orders: Action,
                loading:false
            }

        default:
            return state
    }
}

export default orderReducer
