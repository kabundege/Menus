import React,{ Component } from 'react';
import { connect } from 'react-redux';
import Items from '../helpers/items';
import FoodTypes from '../layout/foodtypes';
import '../../scss/components/geustDash.scss';
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
        const { items,deleteSuccess } = this.props.items;
        const { loading,foodType,deleted } = this.state;

        if(items[0]){
            const values =  window.location.search.split("");
            const newValue = values.splice(10);
            const newFoodType = newValue.join("");

            if(loading){
                this.setState({
                    items,
                    loading:false,
                })
            }

            if(foodType !== newFoodType){
                this.setState({
                    items: items.filter(item => item.food_type.includes(newFoodType)),
                    loading:false,
                    foodType:newFoodType
                })
            }

            if(deleted !== null&&deleteSuccess){

                let newItems;
                newFoodType === "" ?
                newItems = items.filter(item => parseInt(item.id) !== deleted):
                newItems = items.filter(item => item.food_type.includes(newFoodType) && parseInt(item.id) !== deleted);


                this.setState({
                    items:newItems,
                    deleted:null
                })

                this.props.resetDelete()
            }

        }
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
        const { items } = this.state;
        const { AddToCart,authInfo } = this.props;
        return(
            <>
                <FoodTypes />
                <div className="container parent">
                    <Items items={items} addToCart={AddToCart} role={authInfo.role} deleteItem={this.handlerDelete}/>
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
        AddToCart: (data) => dispatch({ type:'AddToCart',action: data }),
        deleteItem: (id) => dispatch(deleteItem(id)),
        resetDelete:()=>dispatch({type:'resetDelete',action:{}})
})



export default connect(mapStateToProps,mapDispatchToProps)(GuestHome);
