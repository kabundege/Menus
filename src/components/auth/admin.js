import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { Redirect } from 'react-router-dom';
import '../../scss/components/login.scss';
import avatar from "../../assets/avatar.svg";
import { authAction } from '../../store/actions/Actions';
import Loader from "react-spinners/BeatLoader";

import dotenv from 'dotenv';

dotenv.config()

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
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

    nextVariants = {
        hidden: { 
          x: '-100vw' 
        },
        visible: {
          x: 0,
          transition: { type: 'spring', stiffness: 80 }
        },
        exit: {
          y: "-100vh",
          transition: { ease: 'easeInOut',delay:0.5 }
        },
      }
    
    componentDidMount(){
        document.title =  'Admin ▪ Login';
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
                    <h1>Sign-in</h1>
                    <form onSubmit={this.handlerSubmit}>
                        <p>Username</p>
                        <input 
                            type="text" 
                            id="username" 
                            value={username}
                            onChange={this.handlerChange} 
                            placeholder="Here..." 
                            required/>
                        <p>Password</p>
                        <input 
                            type="password" 
                            id="password" 
                            value={password}
                            onChange={this.handlerChange} 
                            placeholder="Here..." 
                            required/>
                        <p className="center">{authError}</p>
                         { username !== '' && ( 
                                <motion.button
                                    variants={this.nextVariants} 
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    {
                                        !loading ? 'Login' : <Loader color={"rgb(255, 255, 255)"}/>
                                    }
                                </motion.button>
                         )}
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
