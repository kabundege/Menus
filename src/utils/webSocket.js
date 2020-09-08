import React,{useState} from 'react'
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { motion,AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
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

const Socket = ({ authInfo,AddOrder }) => {
    const { REACT_APP_SOCKET } = process.env;
    const [ message,setMessage ] = useState()

    const [ showToast, setShowToast ] = useState(false)

    const socket = openSocket(REACT_APP_SOCKET);

    socket.on('new_order',order =>{
        AddOrder(order);
        setMessage(order);
        setShowToast(true);
    })

    if (showToast&&authInfo.role !== 'GUEST'){
        setTimeout(()=> setShowToast(false) ,5000)
        return (
            <AnimatePresence>
                    <audio src={ringtone} autoPlay></audio>
                    <motion.div className="notification"
                        variants={nextVariants} 
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div>
                            <i class="fas fa-utensils"></i>
                        </div>
                        <div>
                            <span>{message.origin_type} {message.origin_id}</span>
                            <span>Placed A {message.total_cost} $ Order</span>
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

export default connect(mapStateToProp,mapDispatchToProps)(Socket);