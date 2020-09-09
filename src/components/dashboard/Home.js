import React,{ Component } from 'react';
import { connect } from 'react-redux';
import Items from '../helpers/items';
import FoodTypes from '../layout/foodtypes';
import '../../scss/components/geustDash.scss';
import { getAllItems } from '../../store/actions/Actions';
import Title from '../helpers/dynamicTitle';

class GuestHome extends Component{
    state={
        items:[],
        loading:true,
        foodType:'',
        cart:[]
    }

    componentDidMount(){
        if(localStorage.getItem("token")===null){
            window.location.assign('/')
        }

        this.props.getItems();
        Title();
    }

    componentDidUpdate(){
        const { items } = this.props.items;
        const { loading,foodType } = this.state;

        if(loading&&items[0]){
            this.setState({
                items:[...items],
                loading:false,
            })
        }

        const values =  window.location.search.split("");
        const newValue = values.splice(10);
        const newFoodType = newValue.join("");

        if(!loading && foodType !== newFoodType){
                this.setState({
                    items: items.filter(item => item.food_type.includes(newFoodType)),
                    foodType: newFoodType
                })
        }
    }

    render(){
        const { items } = this.state;
        const { AddToCart,authInfo } = this.props;
        return(
            <>
                <FoodTypes />
                <div className="container parent">
                    <Items items={items} addToCart={AddToCart} role={authInfo.role}/>
                </div>
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
        AddToCart: (data) => dispatch({ type:'AddToCart',action: data })
})



export default connect(mapStateToProps,mapDispatchToProps)(GuestHome);
