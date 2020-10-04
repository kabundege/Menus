import { combineReducers } from 'redux';
import AuthReducer from './components/Auth';
import ItemReducer from './components/items';
import OrderReducer from './components/order';
import StockReducer from './components/stock'

const rootReducer = combineReducers({ 
    auth: AuthReducer,
    items: ItemReducer,
    orders: OrderReducer,
    stock: StockReducer,
});

export default rootReducer;
