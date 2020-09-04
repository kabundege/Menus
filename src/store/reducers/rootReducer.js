import { combineReducers } from 'redux';
import AuthReducer from './components/Auth';
import ItemReducer from './components/items';
import OrderReducer from './components/order';

const rootReducer = combineReducers({ 
    auth: AuthReducer,
    items: ItemReducer,
    orders: OrderReducer,
});

export default rootReducer;
