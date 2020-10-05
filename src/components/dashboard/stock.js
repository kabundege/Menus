import React, { Component } from 'react';
import '../../scss/components/stock/dash.scss';
import Links from '../stock/links';
import Products from '../stock/products';
import Create from '../stock/newProduct';
import Profile from '../stock/profile';

class stock extends Component {
    componentDidMount(){
        if(localStorage.getItem("token")===null){
            window.location.assign('/')
        }
    }
    
    render() {
        const { type } = this.props.match.params;
        return (
            <div className="container stock">
                <Links/>
                <section>
                        {!type || type === 'view' ? <Products/> : null}
                        {type === "create" && <Create/>}
                        {type === "product" && <Profile/>}
                        {type==="transactions"&& <p>transactions</p>}
                </section>
            </div>
        )
    }
}

export default stock;
