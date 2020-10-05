const initState = {
    products:[],
    transactions:[
        { id:"4", author_id:2, author_name:'Aline',product_id:3,product_name:'Fanta',details:"added 700 fanta(s) to 3000 " }
    ],
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
