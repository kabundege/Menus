const initState = {
    items:[],
    fetchError:null,
    cart:[],
    inSession:false,
    creationSuccess:false,
}

const itemReducer = (state = initState,action) => {

    const Action  = action.action;
    switch(action.type){
        case 'GetAllItems_Error':
            return state = {
                ...state,
                fetchError: Action,
            }
        case 'CreateItem_Error':
            return state = {
                ...state,
                fetchError: Action,
            }
        case 'CreateItem_Success':
            return state = {
                ...state,
                fetchError: null,
                creationSuccess:true, 
                items:[...state.items,action]
            }
        case 'DeleteItem_Success':
            return state = {
                ...state,
                items: state.items.filter(item=> item.id !== Action )
            }
        case 'GetAllItems_Success':
            return state = {
                ...state,
                items: Action,
                fetchError:null,
            }
        default:
            return state
    }
}

export default itemReducer
