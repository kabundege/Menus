import React,{ useState,useEffect } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import { connect } from 'react-redux';

const nextVariants = {
    hidden: { 
      y: '-100vw' 
    },
    visible: {
      y: "0vw",
      x:0,
      transition: { type: 'spring', stiffness: 80 }
    },
    exit: {
      x: "-100vh",
      transition: { ease: 'easeInOut',delay:0.5 }
    },
  };

const Network = ({ Network_Error }) => {
    const [ showToast, setShowToast ] = useState(false);

    useEffect(()=>{ if(Network_Error)setShowToast(true) },[Network_Error])

    if (showToast){
        setTimeout(()=> {
            setShowToast(false)
        } ,5000)
        return (
            <AnimatePresence>
                        <motion.div className="network"
                            variants={nextVariants} 
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div>
                                ⚠
                            </div>
                            <div>
                                <span> Network Error </span>
                            </div>
                        </motion.div>
            </AnimatePresence>
        ) 
    }else{
        return <></>
    }
}

const mapStateToProps = state => ({
    Network_Error: state.auth.Network_Error
})

export default connect(mapStateToProps)(Network)