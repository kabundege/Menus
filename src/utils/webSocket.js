import React,{useState} from 'react'
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { Snackbar } from '@material-ui/core'

const Socket = ({ authInfo }) => {
    const { REACT_APP_SOCKET } = process.env;
    const [ message,setMessage ] = useState('')
    const [ showToast, setShowToast ] = useState(false)

    const socket = openSocket(REACT_APP_SOCKET);

    socket.on('new_order',order =>{
        setMessage(order.origin_type.toLocaleUpperCase()+" "+order.origin_id + " Placed an order of " + order.total_cost +' $');
        setShowToast(true);
    })

    if (showToast&&authInfo.role === 'GUEST'){
        setTimeout(()=> setShowToast(false) ,5000)
        return (
                <Snackbar 
                    open={showToast}
                    anchorOrigin={{ vertical: 'top', horizontal : 'left'}}
                    message={ message }
                />
        )
    }else{
        return <></>
    }
}

const mapStateToProp = (state) =>({
    authInfo: state.auth.userInfo
})

export default connect(mapStateToProp)(Socket);