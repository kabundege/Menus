import React,{ useState } from 'react';
import { motion } from 'framer-motion';
import Loader from "react-spinners/RotateLoader";
import Rating from '../layout/rating';
import NewOrder from '../orders/createOrder';

export default  ({ items,addToCart,authInfo,deleteItem }) => {
    const [ foodType, setFoodType ] = useState();
    const [showModel, setShowModel ] = useState(false);
    const [ SpecificItem,setItem ] = useState();
    const values =  window.location.search.split("");
    const newValue = values.splice(10);
    const newFoodType = newValue.join("");
    let data;
    const { loading,Network_Error,userInfo } = authInfo;
    const { role } = userInfo;

    if(foodType !== newFoodType && newFoodType !== ""){
        setFoodType(newFoodType);
        data = items.filter(item => item.food_type.includes(newFoodType))
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
    if(Network_Error){
        return <div className="network center grey-text">
                    <h3>⚠ Network_Error</h3> 
               </div>
    }else if(data[0]&&!loading) {
    return <div className="container parent">
        { showModel && <NewOrder item={SpecificItem} closeModel={setShowModel}/>}
        {
            data.map(item=>(
            <motion.div key={parseInt(item.id)} className="item"
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
                    <div className="ops">
                        <div className="price">
                            <strong >{item.price}</strong>
                            {
                                role==='WAITER' ?
                                <strong 
                                    className="last" 
                                    onClick={()=>{
                                        setItem(item);
                                        setShowModel(true);
                                    }}
                                >
                                    <i className="fas fa-shopping-cart" ></i>
                                </strong> :
                                <strong 
                                    className="last" 
                                    onClick={()=>deleteItem(item.id)}
                                >
                                    <i className="fas fa-trash"></i>
                                </strong>
                                
                            }
                        </div>
                    </div>
                </div>
            </motion.div>
            ))
        }
            </div>
    }else{  
    return <div className="loader">
                <Loader size={100} color={"orange"}/> 
           </div>
            }
}
