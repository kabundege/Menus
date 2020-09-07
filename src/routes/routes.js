import'dotenv/config';
import React,{ Component } from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Header from '../components/helpers/Header';
import Login from '../components/auth/login';
import GuestHome from '../components/dashboard/Home';
import Cart from '../components/dashboard/cart';
import Order from '../components/dashboard/orders';
import Socket from '../utils/webSocket';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Socket/>
          <Header/>
          <Switch >
            <Route path='/' exact component={Login}/>
            <Route path='/Dash' component={GuestHome}/>
            <Route path='/Cart' component={Cart}/>
            <Route path='/Orders' component={Order}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
