import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import moment from 'moment';
import '../../scss/components/orders.scss';
import { getAllOrders } from '../../store/actions/Actions';
import Loader from "react-spinners/RotateLoader";

class Orders extends Component{
    state={
        orders:[]
    }

    componentDidMount(){
        if(localStorage.getItem("token")===null){
            window.location.assign("/")
        }
        this.props.getOrders()
    }

    nextVariants = {
        hidden: { 
          x: '-100vw',
        },
        visible: {
          x: 0,
          transition: { type: 'spring', stiffness: 80 }
        },
      }

    render(){
        const { orders } = this.props;
        const { loading,userInfo } = this.props.authInfo;

        if(orders[0]){
            console.log(JSON.parse(orders[0].items))
        }

        if(!loading){
        return(
                <div className="container orders">
                    {   orders[0] ? 
                        orders.map(order=>{
                            const items = JSON.parse(orders[0].items);
                            return (
                                <div key={order.id} className="container order">
                                    {userInfo.role === 'GUEST' && (
                                            <div className="owner">
                                                <span>owner</span>
                                                <span>{order.origin_type+' '+order.origin_id}</span>
                                            </div>
                                        )
                                    }
                                    <div className="bill">
                                        <span>Total</span>
                                            <span>
                                                <i className="fas fa-cart-plus"></i>
                                                {items.length+' item'}
                                                <i className="fas fa-wallet"></i>
                                                {order.total_cost+' $'}
                                            </span>
                                    </div>
                                    <div className="status">
                                        <span>status</span>
                                        {
                                            order.status === 'pending'?
                                            <span className="red-text text-darken-3">Pending</span> :
                                            <span className="green-text">Delivered</span>
                                        }
                                    </div>
                                    <div className="timestamp">
                                        <span>created</span>
                                        <span>{moment(parseInt(order.timestamp)).calendar()}</span>
                                    </div>
                                     
                                    {userInfo.role === 'GUEST' && (
                                        <button className="center">
                                            {
                                                order.status === 'pending' ?
                                                <>
                                                    Delivered <i className="red-text fas fa-ban"></i>
                                                </> :
                                                <>
                                                    Delivered <i className="green-text far fa-check-circle"></i>
                                                </>
                                            }
                                        </button>
                                        )
                                    }
                                    </div>
                            )}
                        ) : (
                            <div className="container center">
                                <Link to="/dash" className="white-text bold center">
                                    <h3>No orders Yet _ Click here</h3>
                                    <motion.i variants={this.nextVariants} 
                                        initial="hidden"
                                        animate="visible"
                                        className=" fas fa-shopping-cart"
                                        style={{fontSize:"40px",marginLeft:"5%",color:"#f3f3f354"}}
                                        >
                                    </motion.i> 
                                </Link>
                            </div>
                        )
                    }
                </ div>
            )
        } else {
            return(
                <div className="loader">
                        <Loader size={100} color={"rgb(255, 31, 106)"}/> 
                </div>
            )
        };
    }
}


const mapStateToProps = (state) => ({
    authInfo: state.auth,
    orders: state.orders.orders.reverse()
})

const mapDispatchToProps = (dispatch) => ({
    getOrders:()=> dispatch(getAllOrders()),
})

export default connect(mapStateToProps,mapDispatchToProps)(Orders);
