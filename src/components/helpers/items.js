import React from 'react';
import { motion } from 'framer-motion';
import Loader from "react-spinners/RotateLoader";

export default  ({ items,addToCart }) => {
    const nextVariants = {
        hidden: { 
          x: '100vh' 
        },
        visible: {
          x: 0,
          transition: { type: 'spring', stiffness: 80 }
        },
      }
      
    if(items[0]){
        return items.map(item=>(
            <motion.div key={item.id} className="item"
                variants={nextVariants} 
                initial="hidden"
                animate="visible"
            >
                <div className="avatar">
                    <img src={item.photoUrl} alt={item.name+' image'}/>
                </div>
                <div className="details">
                    <div className="desc">
                        <h6>{item.name}</h6>
                        <p>{item.description}</p>
                    </div>
                    <div className="price">
                        <strong>{'$ '+item.price}</strong>
                        <strong onClick={()=>addToCart(item.id)}><i className="fas fa-cart-plus" ></i></strong>
                    </div>
                </div>
            </motion.div>
        ));
    }else{
        return(
            <div className="loader">
                    <Loader size={100} color={"rgb(255, 31, 106)"}/> 
            </div>
        )
    }

}

