import'dotenv/config';
import React,{ Component } from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import Socket from '../utils/webSocket';
import Login from '../components/auth/admin';
import Header from '../components/helpers/Header';
import Users from '../components/dashboard/Users';
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
          <Switch >
            <Route path='/' exact component={Login}/>
            <Route path='/Dash' component={GuestHome}/>
            <Route path='/Orders' component={Orders}/>
            <Route path='/Order/:id' component={Order}/>
            <Route path='/Create' component={NewItem}/>
            <Route path='/users' component={Users}/>
          </Switch>
          <ScrollUpButton style={this.scrollUp} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
