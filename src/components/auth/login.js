import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../../scss/components/login.scss';
import avatar from "../../assets/breakfast.svg";
import { authAction } from '../../store/actions/Actions';
import Loader from "react-spinners/BeatLoader";

import dotenv from 'dotenv';

dotenv.config()

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            origin_id:'',
            origin_type:'Table',
            username:process.env.REACT_APP_GUEST_USERNAME,
            password:process.env.REACT_APP_GUEST_PASSWORD,
        }
    }

    handlerChange = (e) => {
        const { id,value } = e.target;
        this.setState({
            [id]:value
        });
    }

    handlerSubmit = (e) => {
        this.props.signIn(this.state);
        e.preventDefault();
    }

    render(){
        const { loading,authError } = this.props.authInfo;
        const { origin_id } = this.state;
        if(localStorage.getItem('token')!== null) {
            return <Redirect to="/Dash"/>
        }
        return(
            <div className="blob">
                <div className="loginbox">
                    <img src={avatar} className="avatar" alt="avatar"/>
                    <h1>Welcome</h1>
                    <form onSubmit={this.handlerSubmit}>
                        <p>Table Number</p>
                        <input 
                            type="number" 
                            id="origin_id" 
                            value={origin_id}
                            onChange={this.handlerChange} 
                            placeholder="Your Table Number..." 
                            required/>
                        <p className="center">{authError}</p>
                        <button>
                            {
                                !loading ? 'Login' : <Loader color={"rgb(255, 255, 255)"}/>
                            }
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToprops = (state) => {
    return  {
        authInfo: state.auth,
    }
}

const mapDisptachToprops = (dispatch) => {
    return  {
        signIn:(payload) => dispatch(authAction(payload))
    }
}

export default connect(mapStateToprops,mapDisptachToprops)(Login);
