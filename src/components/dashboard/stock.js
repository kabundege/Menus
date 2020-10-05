import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../scss/components/stock/dash.scss';
import Links from '../stock/links';
import Products from '../stock/products';
import Create from '../stock/newProduct';

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
                        {type === "product" && <p>Updating</p>}
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state,oldProps) => ({
        authInfo : state.auth,
    })

export default connect(mapStateToProps)(stock)
