const initState = {
    products:[],
    transactions:[
        { id:"4", author_id:2, author_name:'Aline',product_id:3,product_name:'Fanta',details:"added 700 fanta(s) to 3000 " }
    ],
    fetchError:null
}

const StockReducer = (state = initState,Action) => {

    const { type,action }  = Action;

    switch(type){
        case 'GetAllItems_Error':
            return state = {
                ...state,
                fetchError: action,
            }
        case 'GetAllProducts_Success':
            return state = {
                ...state,
                products: action
            }
        default:
            return state
    }
}

export default StockReducer;
