import React,{useState} from 'react'
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { motion,AnimatePresence } from 'framer-motion';
import ringtone from '../assets/incoming.mp3'
import '../scss/components/helpers/notification.scss';

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

const socket = openSocket(REACT_APP_SOCKET);


const Notify = ({ authInfo,AddOrder }) => {
    const [ message,setMessage ] = useState();
    const [ socketId, setSocketId ] = useState();
    const [ showToast, setShowToast ] = useState(false);

    socket.on('ping',(id)=>{
        if(id !== undefined)
        setSocketId(id);

        if(authInfo.token !== null && socketId !== undefined)
        socket.emit('auth',{ socketId: id, authInfo })
    })

    socket.on('new_order',order =>{
        if(authInfo.role !== "WAITER" && authInfo.role !== "ADMIN"){
            if(order.processor === authInfo.role){
                AddOrder(order);
                setMessage(order.owner);
                setShowToast(true);
            }
        }
    })

    socket.on('updated_order',order=>{
        if(order.creator_id === authInfo.id){
            AddOrder(order);
            setMessage('Pick up');
            setShowToast(true);
        }
    })

    if (showToast&&authInfo.role !== 'GUEST'){
        setTimeout(()=> {
            setShowToast(false)
            setMessage();
        } ,5000)
        return (
            <AnimatePresence>
                    <audio src={ringtone} autoPlay loop></audio>
                    <section className="cover">
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
                                <span> { message }</span>
                            </div>
                        </motion.div>
                    </section>
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