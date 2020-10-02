import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../scss/components/orders/oneOrder.scss';
import { updateOrder,getOneOrder } from '../../store/actions/Actions';

const checkAuth = () => {
    if(localStorage.getItem("token")===null)
    return window.location.assign('/')
}

class Order extends Component {
    state = {
        loading:true,
        order:[]
    }

    handlerChange = e => {
        const { id,value } = e.target;
        this.setState({
            order: { ...this.state.order,[id]:value }
        })
    }

    handlerSubmit = e => {
        e.preventDefault();
        const { 
            itemCount,item,prep_Status,status,owner
        } = this.state.order
        this.props.update({
            itemCount,item,prep_Status,status,owner
        })
    }

    componentDidMount(){
        checkAuth();
        this.props.getOrder();
    }

    componentDidUpdate(){
        if(this.props.order.orders.id&&this.state.loading){
            this.setState({
                loading:false,
                order:this.props.order.orders
            })
        }
    }

    render(){
        const { order } = this.state;
        const { role } = this.props.authInfo.userInfo;
        return (
            <div className="OrderProfile">
                <img src={order.photoUrl} alt={order.name}/>
                <form onSubmit={this.handlerSubmit}>
                    <div>
                        <h4>{order.owner}</h4>
                    </div>
                    <div>
                        <section>
                            <span>Total Cost</span>  
                            <span>{parseInt(order.itemCount) * parseInt(order.price)}</span>
                        </section>
                        <section>
                            <span>Item</span>
                            <span>{order.name}</span>
                        </section>
                        <section>
                            <span>Item Count</span>
                            <span>
                                <input 
                                    type="number" 
                                    id="itemCount" 
                                    value={order.itemCount} 
                                    onChange={this.handlerChange}/>
                            </span>
                        </section>
                        <section>
                            <span>Delivered</span>
                            {order.status === "pending"?
                            <>
                            <span className="red-text">{order.status}</span>
                            { role === "WAITER" && 
                                <span
                                    className="green-text statusChanger"
                                    onClick={()=>
                                        this.setState({ order : { ...order,status:'Delivered'} })}
                                >↪</span>
                            }
                            </>
                            :
                            <span className="green-text">{order.status}</span>
                            }
                        </section>
                        <section>
                            <span>Preparation</span>
                            {order.prep_Status === "pending"?
                            <>
                                <span className="red-text">{order.prep_Status}</span>
                                { role !== "WAITER"  && 
                                    <span
                                        className="green-text statusChanger"
                                        onClick={()=>
                                            this.setState({ order : { ...order,prep_Status:'Done'} })
                                        }
                                
                                    >↪</span>
                                }
                            </>
                            :
                            <span className="green-text">{order.prep_Status}</span>
                            }
                        </section>
                    </div>
                    <p className="white-text bold center">{this.props.order.fetchError}</p>
                    <button 
                        className="wave_effect"
                    > 
                        SAVE
                    </button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) =>({
    authInfo: state.auth,
    order: state.orders,
})

const mapDispatchToProps = (dispatch,oldProps) => ({
    update: (payload) => dispatch(updateOrder(oldProps.match.params.id,payload)),
    getOrder: () => dispatch(getOneOrder(oldProps.match.params.id))
})

export default connect(mapStateToProps,mapDispatchToProps)(Order);
