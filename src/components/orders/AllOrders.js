import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import '../../scss/components/orders/orders.scss';
import { getAllOrders,getAllItems,deleteOrder } from '../../store/actions/Actions';
import Loader from "react-spinners/RotateLoader";
import Title from "../helpers/dynamicTitle";
import Rating from '../layout/rating';
import { Link } from 'react-router-dom';

class Orders extends Component{
    state={
        orders:[],
        viewOrder:false,
        orderItem:null,
        searchContent:''
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

    handlerChange=(e)=>{
        const { id,value } = e.target;
        this.setState({
            [id]:value
        })
    }

    render(){
        const { loading,orders,items,eraseOrder } = this.props;
        const { userInfo } = this.props.authInfo;
        const { orderItem,viewOrder,searchContent } = this.state;

        let data;

        if(searchContent!==''){
            let result
            //by orwner
            result = orders.filter(order=> order.owner.includes(searchContent))
            //by status
            if(!result[0])
            result = orders.filter(order=> order.status.includes(searchContent))
            //by waitor

            if(!result[0])
            result = orders.filter(order=> order.creator_name.includes(searchContent))

            data = result
        }else{
            data = orders;
        }

        if(!loading){
        return(
                <div className="container orders">
                        <div className="container input-field search">
                            <input
                                type="text"
                                placeholder="Find Order..."
                                id="searchContent"
                                value={this.state.searchContent}
                                onChange={this.handlerChange} />
                            <i className="fas fa-search"></i>
                        </div>
                    {
                        //View items on a specific order
                        viewOrder && (
                            <div className="overlay container">
                                <div>
                                    <span>Item</span>
                                    <span className="red-text darken-2" onClick={()=> this.setState({ viewOrder: false })}><i className="red-text darken-text-5 fas fa-times-circle"></i></span>
                                </div>
                                <ul>
                                    {
                                        <li >
                                            <span><img src={orderItem.photoUrl} alt={orderItem.name+' image'}/></span>
                                            <span>{orderItem.name} <Rating/></span>
                                        </li>
                                    }
                                </ul>
                            </div>
                        )
                    }
                    {   data[0] ?
                        data.map((order,index)=>{
                            let item = items.find(item => parseInt(item.id) === order.item );

                            let type='sec', Duration = moment(order.updatedAt).diff(order.createdAt, "seconds")

                            if(Duration>59&&Duration<3540){
                                type = 'min';
                                Duration = moment(order.updatedAt).diff(order.createdAt, "minutes")
                            }else if(Duration>3540&&Duration<84960){
                                type='hours';
                                Duration = moment(order.updatedAt).diff(order.createdAt, "hours")
                            }else if(Duration>84960){
                                type='days';
                                Duration = moment(order.updatedAt).diff(order.createdAt, "days")
                            }

                            return (
                                <div key={index} className="container order">

                                    <div className="owner">
                                        <span>owner</span>
                                        <span>{order.owner}</span>
                                    </div>
                                    <div className="bill">
                                        <span>item</span>
                                        <span>
                                            { item && order.itemCount +" "+ item.name }
                                        </span>
                                    </div>
                                    <div >
                                        <span>COST</span>
                                        <span>
                                            {order.total_cost} rwf
                                        </span>
                                    </div>
                                    <div className="status">
                                        <span>Prep</span>
                                        {
                                            order.prep_Status === 'pending'?
                                            <span>Done <i className="red-text fas fa-ban"></i></span> :
                                            <span>Done  <i className="green-text far fa-check-circle"></i></span>
                                        }
                                    </div>
                                    <div className="status">
                                        <span>status</span>
                                        {
                                            order.status === 'pending'?
                                            <span>Delivered <i className="red-text fas fa-ban"></i></span> :
                                            <span >Delivered <i className="green-text far fa-check-circle"></i></span>
                                        }
                                    </div>
                                    {
                                        userInfo.role !== 'WAITER'&&
                                        <div className="timestamp">
                                            <span>Waitor</span>
                                            <span>{order.creator_name}</span>
                                        </div>
                                    }
                                    {
                                        order.status !== 'pending' || userInfo.role === 'ADMIN' ?

                                        <div className="delivered">
                                            <span>served</span>
                                            <span>{Duration+' '+type} later</span>
                                        </div> :
                                        <div className="timestamp">
                                            <span>created</span>
                                            <span>{moment(order.createdAt).calendar()}</span>
                                        </div>
                                    }

                                    <section>
                                        <Link to={'order/'+order.id}><i className="far fa-eye"></i></Link>
                                        <span
                                            onClick={()=>window.confirm("Are You Sure")&&eraseOrder(order.id)}
                                        ><i className="fas fa-trash"></i></span>
                                    </section>
                                </div>
                            )}
                        ) : (
                            <h3 className="grey-text bold center">No Orders Found</h3>
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
    eraseOrder: (id)=> dispatch(deleteOrder(id)),
    getAllItems: () => dispatch(getAllItems())
})

export default connect(mapStateToProps,mapDispatchToProps)(Orders);
