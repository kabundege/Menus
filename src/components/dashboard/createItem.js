import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../scss/components/Itemform.scss';
import { createItem } from '../../store/actions/Actions';

class NewItem extends Component{
    state = {
        newItem:{
            name:'',
            food_type:'',
            price:'',
            description:'',
            status:'active'
        },
        photoUrl:null,
        defaultPhoto:"https://lh3.googleusercontent.com/proxy/TWMyjQJgj60ru7APG1jIYiqfZMfOmT7ngHaKfu2P8SOYAp8Bb-U5Voud8oeCAen-3jLP6rtLp37x1XmiPTOEvmH4QYJeg8d7sfddVmfr-GKWTM3ODGY6qBwjzaiMT59Ua3HrKOJQXMm7-jQ99JWgFzo"
    }
    handlerChange = (e) => {
        const { id,value } = e.target;
        // console.log(document.getElementsByTagName("form"));
        this.setState({
            newItem: {
                ...this.state.newItem,
                [id]:value,
            }
        })
    }
    handlerSubmit = (e) => {
        e.preventDefault();
        // this.props.newItem(document.getElementsByTagName("form"))
    }
    render(){
        const { photoUrl,newItem,defaultPhoto } = this.state;
        const { price,description,status,name,food_type } = newItem;

        return (
            <div className="container item">
                <h5 className="center">Item Profile</h5>
                <form onSubmit={this.handlerSubmit} className="itemProfile" >
                    <div className="container">
                        <span>Item Image 👉</span>
                        <span>
                        { photoUrl === null ? 
                            <img src={defaultPhoto} alt="default"/> :
                            <img name="avatar" src={null} alt="NewImg"/>
                        }
                        <input type="file" id="photoUrl" onChange={(e)=> this.setState({ [e.target.id]: e.target.value })}/>
                        </span>
                    </div>
                    <div className="input">
                        <label htmlFor="name">Name</label>
                        <input type="text" value={name} id="name" onChange={this.handlerChange} placeholder="Enter the name...."/>
                    </div>
                    <div className="input">
                        <label htmlFor="name">Food Type</label>
                        <input type="text" value={food_type} id="food_type" onChange={this.handlerChange} placeholder="Enter the name...."/>
                    </div>
                    <div className="input">
                        <label htmlFor="Description">Description</label>
                        <textarea maxLength="200" value={description} placeholder="200 length max" id="description" onChange={this.handlerChange}></textarea>
                    </div>
                    <div className="input">
                        <label htmlFor="price">Price</label>
                        <input type="number" value={price} id="price" onChange={this.handlerChange} placeholder="20 $"/>
                    </div>
                    <div className="input status">
                        <label >Status </label>
                        <div>
                            <span className={ status === 'active' ? "green white-text" : "green-text" } onClick={()=> this.setState({ newItem : {...newItem,status: 'active' }})} >ON</span>
                            <span className={ status === 'active' ? "red-text" : "red white-text" } onClick={()=> this.setState({ newItem : {...newItem,status: 'dormant' }})} >OFF</span>
                        </div>
                    </div>
                    <button >Save</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    newItem: (payload) => dispatch(createItem(payload))
})

export default connect(undefined,mapDispatchToProps)(NewItem);