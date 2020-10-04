const initState = {
    products:[
        {id:"1",name:"Fanta",quantity:3700,type:"goods",avatar:"RAD 567 G"},
        {id:"2",name:"ibirahure",quantity:60,type:"utils",avatar:"Mabuja"},
        {id:"3",name:"primus",quantity:100,type:"goods",avatar:"RAE 300 A"},
        {id:"4",name:"isabune",quantity:10,type:"utils",avatar:"boss"},
        {id:"6",name:"inkoko",quantity:30,type:"goods",avatar:"karangwa"},
        {id:"5",name:"amatara",quantity:700,type:"utils",avatar:"RAD 567 G"},
    ],
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
