import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import moment from 'moment';
import '../../scss/components/orders.scss';
import { getAllOrders,updateOrder,getAllItems } from '../../store/actions/Actions';
import Loader from "react-spinners/RotateLoader";
import Title from "../helpers/dynamicTitle";
import Rating from '../layout/rating';

class Orders extends Component{
    state={
        orders:[],
        viewOrder:false,
        orderItems:[],
    }

    componentDidMount(){
        if(localStorage.getItem("token")===null){
            window.location.assign("/")
        }
        this.props.getOrders();
        this.props.getAllItems();
        Title();
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
        const { loading,orders,deliverOder,items } = this.props;
        const { userInfo } = this.props.authInfo;
        const { orderItems,viewOrder } = this.state;

        if(!loading){
        return(
                <div className="container orders">
                    {
                        viewOrder && (
                            <div className="overlay container">
                                <div>
                                    <span>Items</span>
                                    <span className="red-text darken-2" onClick={()=> this.setState({ viewOrder: false })}><i className="red-text darken-text-5 fas fa-times-circle"></i></span>
                                </div>
                                <ul>
                                    {
                                        items.map((item,index)=>{
                                            let found = false;

                                            for(const order of orderItems){
                                                if(item.id === JSON.stringify(order)){
                                                    found = true;
                                                }
                                            }

                                            if(found){
                                                return (
                                                    <li key={index}>
                                                        <span><img src={item.photoUrl} alt={item.name+' image'}/></span>
                                                        <span>{item.name} <Rating/></span>
                                                    </li> 
                                                )
                                            }else{
                                                return <></>
                                            }
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    }
                    {   orders[0] ? 
                        orders.map((order,index)=>{
                            const items = Array.isArray(order.items) ?  order.items : JSON.parse(order.items)
                           
                            let type='sec', Duration = moment(order.updatedAt).diff(parseInt(order.timestamp), "seconds")
                            
                            if(Duration>59&&Duration<3540){
                                type = 'min';
                                Duration = moment(order.updatedAt).diff(parseInt(order.timestamp), "minutes")
                            }else if(Duration>3540&&Duration<84960){
                                type='hours';
                                Duration = moment(order.updatedAt).diff(parseInt(order.timestamp), "hours")
                            }else if(Duration>84960){
                                type='days';
                                Duration = moment(order.updatedAt).diff(parseInt(order.timestamp), "days")
                            }


                            return (
                                <div key={index} className="container order">
                                    {userInfo.role !== 'GUEST' && (
                                            <div className="owner">
                                                <span>owner</span>
                                                <span>{order.origin_type+' '+order.origin_id}</span>
                                            </div>
                                        )
                                    }
                                    <div className="bill">
                                        <span>Total</span>
                                        <i className="viewer far fa-eye" onClick={()=>{
                                            this.setState({
                                                viewOrder: true,
                                                orderItems: items,
                                            })
                                        }}></i>
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
                                            <span>Delivered <i className="red-text fas fa-ban"></i></span> :
                                            <span >Delivered <i className="green-text far fa-check-circle"></i></span>
                                        }
                                    </div>
                                    <div className="timestamp">
                                        <span>created</span>
                                        <span>{moment(parseInt(order.timestamp)).calendar()}</span>
                                    </div>
                                    {
                                        order.status !== 'pending' && 
                                        <div className="delivered">
                                            <span>served</span>
                                            <span> By {order.server+' '+Duration+' '+type} later</span>
                                        </div>
                                    }
                                     
                                    {userInfo.role !== 'GUEST' && (
                                        <button className="center">
                                            {
                                                order.status === 'pending' ?
                                                <p onClick={()=>deliverOder(order.id,{status:"Delivered",items})}>
                                                    Deliver <i className="tiny fas fa-shopping-cart"></i>
                                                </p> :
                                                <>
                                                    Done <i className="fas fa-check"></i>
                                                </>
                                            }
                                        </button>
                                        )
                                    }
                                    </div>
                            )}
                        ) : (
                            <div className="container center">
                                <Link to="/dash" className="grey-text bold center">
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
                        <Loader size={100} color={"orange"}/> 
                </div>
            )
        };
    }
}


const mapStateToProps = (state) => ({
    authInfo: state.auth,
    orders: state.orders.orders,
    items: state.items.items,
})

const mapDispatchToProps = (dispatch) => ({
    getOrders:  () => dispatch(getAllOrders()),
    deliverOder: (id,payload) => dispatch(updateOrder(id,payload)),
    getAllItems: () => dispatch(getAllItems())
})

export default connect(mapStateToProps,mapDispatchToProps)(Orders);
