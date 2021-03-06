import'dotenv/config';
import React,{ Component } from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import Socket from '../utils/webSocket';
import Login from '../components/auth/admin';
import Header from '../components/helpers/Header';
import Users from '../components/dashboard/Users';
import Stock from '../components/dashboard/stock';
import Network from '../components/layout/network';
import Orders from '../components/orders/AllOrders';
import GuestHome from '../components/dashboard/Home';
import Order from '../components/orders/SpecificOrder';
import NewItem from '../components/dashboard/createItem';

class App extends Component {
  scrollUp = {background:'transparent',border:"3px solid orange",outline:"none"}
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Header/>
          <Socket/>
          <Network/>
          <Switch >
            <Route path='/' exact component={Login}/>
            <Route path='/Dash' component={GuestHome}/>
            <Route path='/Orders' component={Orders}/>
            <Route path='/Order/:id' component={Order}/>
            <Route path='/item/create' component={NewItem}/>
            <Route path='/users' component={Users}/>
            <Route path='/stock/:type' component={Stock}/>
            <Route path='/stock' component={Stock}/>
          </Switch>
          <ScrollUpButton style={this.scrollUp} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
