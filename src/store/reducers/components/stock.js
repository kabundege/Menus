const initState = {
    products:[],
    transactions:[],
    product:null,
    fetchError:null
}

const StockReducer = (state = initState,Action) => {

    const { type,action }  = Action;

    switch(type){
        case 'UpdateProduct_Error':
            return state = {
                ...state,
                fetchError: action,
            }
        case 'GetOneProduct_Success':
            return state = {
                ...state,
                product: action
            }
        case 'GetAllTrans_Success':
            return state = {
                ...state,
                transactions: action
            }
        case 'GetAllProducts_Success':
            return state = {
                ...state,
                products: action
            }
        case 'DeleteProduct_Success':
            return state = {
                ...state,
                products: state.products.filter(prod => prod.id !== action)
            }
        default:
            return state
    }
}

export default StockReducer;
