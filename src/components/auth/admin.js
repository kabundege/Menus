import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../../scss/components/auth/login.scss';
import avatar from "../../assets/avatar.svg";
import { authAction } from '../../store/actions/Actions';
import Loader from "react-spinners/BeatLoader";

import dotenv from 'dotenv';

dotenv.config()

class Login extends Component{
    state = {
        username:'',
        password:'',
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

    componentDidMount(){
        document.title =  'PasaDa ▪ Login';
    }
    
    render(){
        const { loading,authError } = this.props.authInfo;
        const { username,password } = this.state;
        if(localStorage.getItem('token')!== null) {
            return <Redirect to="/Dash"/>
        }
        return(
            <div className="blob">
                <div className="loginbox">
                    <img src={avatar} className="avatar" alt="avatar"/>
                    <h1>Welcome</h1>
                    <form onSubmit={this.handlerSubmit}>
                        <section>
                            <span role="img" aria-label="visible">🙍</span>
                            <input 
                                type="text" 
                                id="username" 
                                value={username}
                                onChange={this.handlerChange} 
                                placeholder="username" 
                                required/>
                        </section>
                        <section>
                            <span role="img" aria-label="visible">🔐</span>
                            <input 
                                type="password" 
                                id="password" 
                                value={password}
                                onChange={this.handlerChange} 
                                placeholder="Password" 
                                required/>
                        </section>
                        <p className="center">{authError}</p>
                        <button>
                            {
                                !loading ? '↪' : <Loader color={"rgb(255, 255, 255)"}/>
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
