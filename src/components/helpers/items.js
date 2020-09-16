import React,{ useState } from 'react';
import { motion } from 'framer-motion';
import Loader from "react-spinners/RotateLoader";
import Rating from '../layout/rating';

export default  ({ items,addToCart,role,deleteItem }) => {
    const [ foodType, setFoodType ] = useState();
    let data;
    const values =  window.location.search.split("");
    const newValue = values.splice(10);
    const newFoodType = newValue.join("");

    if(foodType !== newFoodType){
        setFoodType(newFoodType);
        data = items.filter(item => items.filter(item => item.food_type.includes(newFoodType)))
    }else if(foodType){
        data = items.filter(item => item.food_type.includes(foodType))
    }else{
        data = items
    }

    const nextVariants = {
        hidden: { 
          x: '100vh' 
        },
        visible: {
          x: 0,
          transition: { type: 'spring', stiffness: 80 }
        },
      };
      
    if(data[0]){
        return data.map(item=>(
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
                        <Rating/>
                        <p>{item.description}</p>
                    </div>
                    <div className="price">
                        <strong >{'$ '+item.price}</strong>
                        {
                            role==='GUEST' ?
                            <strong className="last" onClick={()=>addToCart(item.id)}><i className="fas fa-cart-plus" ></i></strong> :
                            <strong className="last" onClick={()=>deleteItem(item.id)}><i className="tiny fas fa-trash"></i></strong>
                            
                        }
                    </div>
                </div>
            </motion.div>
        ));
    }else{
        return(
            <div className="loader">
                    <Loader size={100} color={"orange"}/> 
            </div>
        )
    }

}

