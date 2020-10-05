import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loader from "react-spinners/BeatLoader";
import { OneProduct,updateProduct } from '../../store/actions/Actions';

const urlHandler = (local) =>{
    const arr = local.pathname.split("")
    const newArr = arr.slice(15);
    return newArr.join("");
}

const Profile = ({ stock,getProd,updateProd,authInfo }) => {
    const { product,fetchError } = stock;
    const location = useLocation();
    const [ payload, setPayload ] = useState({
        name:'',
        quantity:'',
        avatar:'',
        type:''
    });
    const [ id,setId ] = useState();
    const [ prevId,setPrevId ] = useState();
    const [ Done, setDone ] = useState(false);
    const { loading,userInfo }  = authInfo;
    
    const { name,avatar,type,quantity } = payload;

    const newId = urlHandler(location)

    if(newId !== id){
        setId(newId)
    } 

    useEffect(()=>{
        if(prevId!==id){
            getProd(newId)
            setPrevId(id)
        }else{
            setPayload(product)
        }
    },[id,product])
    
    const handlerChange = e => {
        const { id,value } = e.target;
        setPayload({ ...payload,[id]:value});
        setDone(false)
    }

    const handlerSubmit = e => {
        e.preventDefault();
        setDone(true)
        updateProd(id,{avatar,name,type,quantity})
    }

    return (
        <div className="container newProd">
            { isNaN(parseInt(id))  ? <form><h3>Pick A Product</h3></form> :  
            <form onSubmit={handlerSubmit}>
                <h3>Update Product</h3>
                <select id="type" className="browser-default" onChange={handlerChange} value={type}>
                    <option value={type} disabled>{type}</option>
                    <option value="goods">Goods</option>
                    <option value="utilities">Utilities</option>
                </select>
                <div className="input-field">
                    <span role="img" aria-label="visible">🙍</span>
                    <input 
                        type="text" 
                        id="avatar" 
                        value={avatar}
                        onChange={handlerChange} 
                        placeholder="Deliver name" 
                        required/>
                </div>
                <div className="input-field">
                    <span role="img" aria-label="visible">🍷</span>
                    <input 
                        type="text" 
                        id="name" 
                        value={name}
                        onChange={handlerChange} 
                        placeholder="Product's Name" 
                        required/>
                </div>
                <div className="input-field">
                    <span role="img" aria-label="visible">✨</span>
                    <input 
                        type="number" 
                        id="quantity" 
                        min="0"
                        value={quantity}
                        onChange={handlerChange} 
                        placeholder="product's Quantiry" 
                        required/>
                </div>
                <p className="error">{fetchError}</p>
               
                { userInfo.role === "WAITER" ? 
                    <p>Not Allowed To Update</p> : 
                    <button > 
                        {
                            !loading ? Done ? 'Done !': 'Update' : <Loader color={"rgb(255, 255, 255)"}/>
                        } 
                     </button> 
                }
            </form>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    stock: state.stock,
    authInfo: state.auth,
})

const mapDispatchToProps = (dispatch) => ({
    getProd: (id) => dispatch(OneProduct(id)),
    updateProd: (id,payload) => dispatch(updateProduct(id,payload)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Profile);