import {motion} from 'framer-motion';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../../scss/components/dashboards/users.scss';
import Loader from "react-spinners/BeatLoader";
import { CreateUser } from '../../store/actions/Actions';

class Users extends Component {
    state = {
        username:'',
        password:'',
        role:'Assign Role'
    }

    componentDidMount(){
        document.title = 'Create ▪ User'
    }
    
    componentDidUpdate(){
        const { role } =this.props.authInfo.userInfo;
        if(role !== 'ADMIN' && role !== null)
        window.location.assign('/Dash')
    }

    handlerChange = e => {
        const { id,value } = e.target;
        this.setState({
            [id] : value
        })
    }

    handlerSubmit = e => {
        e.preventDefault()
        this.props.NewUser(this.state)
    }

    render() {
        const { username,password,role } = this.state;
        const { loading,authError,userCreated } = this.props.authInfo;
        return (
            <div className="container">
                <form onSubmit={this.handlerSubmit}>
                    <h3>Create User</h3>
                    <select id="role" className="browser-default" onChange={this.handlerChange} value={role}>
                        <option value={role} disabled>{role}</option>
                        <option value="COOK">COOK</option>
                        <option value="BAR">BAR</option>
                        <option value="WAITER">WAITER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                    <div className="input-field">
                        <span role="img" aria-label="visible">🙍</span>
                        <input 
                            type="text" 
                            id="username" 
                            value={username}
                            onChange={this.handlerChange} 
                            placeholder="username" 
                            required/>
                    </div>
                    <div className="input-field">
                        <span role="img" aria-label="visible">🔐</span>
                        <input 
                            type="password" 
                            id="password" 
                            value={password}
                            onChange={this.handlerChange} 
                            placeholder="Password" 
                            required/>
                    </div>
                    <p className="error">{authError}</p>
                    {role !== 'Assign Role' &&
                        <motion.div className="center"
                            initial={{ x: -1000}}
                            animate={{ x: 0 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                        >
                            <button disabled={ password === ''||username==='' ? true : false } >
                                { !loading ? !userCreated ? 'Create' : 'Done!' : <Loader/>}
                            </button>
                        </motion.div> 
                    }
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authInfo: state.auth
})

const mapDispatchToProps = (dispatch) => ({
    NewUser: (payload) => dispatch(CreateUser(payload))
})

export default connect(mapStateToProps,mapDispatchToProps)(Users);