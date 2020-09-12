import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../scss/components/Itemform.scss';
import { createItem } from '../../store/actions/Actions';
import defaultAvatar from '../../assets/default.png';
import Loader from "react-spinners/BeatLoader";

const { REACT_APP_BASE_WEB_URL } = process.env;

class NewItem extends Component{
    state = {
        name:'',
        food_type:'',
        price:'',
        photoUrl:'',
        description:'',
        status:'active'
    }
    
    handlerChange = (e) => {
        const { id,value } = e.target;

        this.setState({
            [id]:value,
        })
    }

    handlerSubmit = (e) => {
        e.preventDefault();
        this.props.newItem(this.state)
        setTimeout(()=> this.Genesis = true,2000)
    }

    handlerAvatar = async (e) => {
        const formData = new FormData();

        formData.append('avatar',e.target.files[0]);

        fetch(`${REACT_APP_BASE_WEB_URL}/imageUpload`,{
            method:'POST',
            headers:{ 
                authorization : localStorage.getItem("token") 
            },
            body:formData,
        }).then(res => res.json()).then(data => {
            if(data.status === 201)
            this.setState({ photoUrl: data.data })
        })

    }

    componentDidMount(){
        document.title = "Item Profile";
    }
    Genesis = false;
    render(){
        const { price,photoUrl,description,status,name,food_type } = this.state;
        const { fetchError,creationSuccess } = this.props.item;
        const { loading } = this.props.authInfo;

        return (
            <div className="container item">
                <h5 className="center">Item Profile</h5>
                <form onSubmit={this.handlerSubmit} className="itemProfile" >
                    <div className="container">
                        <span>Item Image</span>
                        <span>
                        { photoUrl === '' ? 
                            <img src={defaultAvatar} alt="default"/> :
                            <img src={photoUrl} alt="NewImg"/>
                        }
                        <input type="file" id="photoUrl" onChange={this.handlerAvatar}/>
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
                            <span className={ status === 'active' ? "green white-text" : "green-text" } onClick={()=> this.setState({ status: 'active' })} >ON</span>
                            <span className={ status === 'active' ? "red-text" : "red white-text" } onClick={()=> this.setState({ status: 'dormant' })} >OFF</span>
                        </div>
                    </div>
                    <p id="error">{fetchError}</p>
                    {
                        !creationSuccess&&!this.Genesis ? 
                        <button >
                                {
                                    !loading ? 'Save' : <Loader color={"rgb(255, 255, 255)"}/> 
                                }
                        </button> :
                        <p className="center">
                            <i className="success large fas fa-check-circle"></i>
                        </p>
                    }
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authInfo: state.auth,
    item: state.items,
})

const mapDispatchToProps = (dispatch) => ({
    newItem: (payload) => dispatch(createItem(payload))
})

export default connect(mapStateToProps,mapDispatchToProps)(NewItem);