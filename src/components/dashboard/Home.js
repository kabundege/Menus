import React,{ Component } from 'react';
import { connect } from 'react-redux';
import Items from '../helpers/items';
import FoodTypes from '../layout/foodtypes';
import '../../scss/components/dashboards/items.scss';
import { getAllItems,deleteItem } from '../../store/actions/Actions';
import Title from '../helpers/dynamicTitle';

class GuestHome extends Component{
    state={
        items:[],
        loading:true,
        foodType:'',
        cart:[],
        deleted:[]
    }

    componentDidMount(){
        if(localStorage.getItem("token")===null){
            window.location.assign('/')
        } 

        this.props.getItems();
    }

    componentDidUpdate(){
        Title();
    }

    handlerDelete = (id) =>{
        if(window.confirm('Are You Sure')){
            this.props.deleteItem(id);
            this.setState({
                loading:true,
                deleted:id
            })
        }
    }

    render(){
        const { items } = this.props.items;
        const { AddToCart,authInfo } = this.props;
        return(
            <>
                <FoodTypes />
                <Items items={items} addToCart={AddToCart} role={authInfo.role} deleteItem={this.handlerDelete}/>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
        authInfo: state.auth.userInfo,
        items:state.items,
    })

const mapDispatchToProps = (dispatch) => ({
        getItems: () => dispatch(getAllItems()),
        AddToCart: (data) => dispatch({ type:'AddToCart',action: data }),
        deleteItem: (id) => dispatch(deleteItem(id))
})



export default connect(mapStateToProps,mapDispatchToProps)(GuestHome);
