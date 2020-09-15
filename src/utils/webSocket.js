import React,{useState} from 'react'
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { motion,AnimatePresence } from 'framer-motion';
import ringtone from '../assets/incoming.mp3'
import '../scss/components/notification.scss';

const nextVariants = {
    hidden: { 
      y: '-100vw' 
    },
    visible: {
      y: "0vw",
      x:"-7vw",
      transition: { type: 'spring', stiffness: 80 }
    },
    exit: {
      x: "-100vh",
      transition: { ease: 'easeInOut',delay:0.5 }
    },
  }

const { REACT_APP_SOCKET } = process.env;
console.log(REACT_APP_SOCKET);

const socket = openSocket(REACT_APP_SOCKET);


const Notify = ({ authInfo,AddOrder }) => {
    
    const [ message,setMessage ] = useState();
    const [ socketId, setSocketId ] = useState();
    const [ showToast, setShowToast ] = useState(false);

    socket.on('ping',(id)=>{

        if(id !== undefined)
        setSocketId(id);

        if(authInfo.token !== null && socketId !== undefined)
        socket.emit('auth',{ socketId: id, authInfo : authInfo.origin_id + ' ' + authInfo.origin_type})
    })

    socket.on('new_order',order =>{
        AddOrder(order);
        setMessage(order);
        setShowToast(true);
    })

    if (showToast&&authInfo.role !== 'GUEST'){
        setTimeout(()=> setShowToast(false) ,10000)
        return (
            <AnimatePresence>
                    <audio src={ringtone} autoPlay loop></audio>
                    <motion.div className="notification"
                        variants={nextVariants} 
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div>
                            <i className="fas fa-utensils"></i>
                        </div>
                        <div>
                            <span>{message.origin_type} {message.origin_id}</span>
                            <span>Placed a {message.total_cost} $ Order</span>
                        </div>
                    </motion.div>
            </AnimatePresence>
        ) 
    }else{
        return <></>
    }
}

const mapStateToProp = (state) =>({
    authInfo: state.auth.userInfo
})

const mapDispatchToProps = (dispatch) => ({
    AddOrder: (order) => dispatch({type:'AddOrder',action:order})
})

export default connect(mapStateToProp,mapDispatchToProps)(Notify);