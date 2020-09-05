import React,{ Component } from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Header from '../components/helpers/Header';
import Login from '../components/auth/login';
import GuestHome from '../components/dashboard/HomeGuest';
import Cart from '../components/dashboard/cart';
import Order from '../components/dashboard/orders';

import dotenv from 'dotenv';

dotenv.config()

class App extends Component {
  componentDidMount(){
    
  }
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Header/>
          <Switch>
            <Route path='/' exact component={Login}/>
            <Route path='/dash' component={GuestHome}/>
            <Route path='/cart' component={Cart}/>
            <Route path='/orders' component={Order}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
