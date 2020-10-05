const initState = {
    products:[],
    transactions:[
      { id:"4", author_id:2, author_name:'Aline',product_id:3,product_name:'Fanta',details:"added 700 fanta to 3000 " },
      { id:"1", author_id:2, author_name:'Eric',product_id:3,product_name:'Amagi',details:"removed 20 amagi from 150 " },
      { id:"2", author_id:2, author_name:'Derrick',product_id:3,product_name:'Heinken',details:"added 15 heiniken to 100 " },
      { id:"3", author_id:2, author_name:'kalisa',product_id:3,product_name:'Ibasube',details:"added 7 isabune to 0 " }
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
