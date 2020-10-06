import React,{ useState } from 'react';
import { connect } from 'react-redux';
import '../../scss/components/stock/new.scss';
import Loader from "react-spinners/BeatLoader";
import { createProduct } from '../../store/actions/Actions';

const NewProduct = ({ stock,createProd,authInfo }) => {
    const [ payload, setPayload ] = useState({
        name:'',
        avatar:'',
        price:'',
        type:'Type',
        quantity:'',
    });

    const [ Done, setDone ] = useState(false);

    const { name,avatar,type,quantity,price } = payload;
    const { userInfo,loading } = authInfo;

    const handlerChange = e => {
        const { id,value } = e.target;
        setPayload({ ...payload,[id]:value});
        setDone(false)
    }
    const handlerSubmit = e => {
        e.preventDefault();
        setDone(true)
        createProd(payload)
    }
    return (
        <div className="container newProd">
            <form onSubmit={handlerSubmit}>
                <h3>Create Product</h3>
                <select id="type" className="browser-default" onChange={handlerChange} value={type}>
                    <option value={type} disabled>{type}</option>
                    <option value="goods">Goods</option>
                    <option value="utilities">Utilities</option>
                </select>
                <div className="input-field">
                    <span role="img" aria-label="visible">🚚</span>
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
                    <span role="img" aria-label="visible">💰</span>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        onChange={handlerChange}
                        placeholder="Product's worth"
                        required/>
                </div>
                <div className="input-field">
                    <span role="img" aria-label="visible">🔢</span>
                    <input
                        type="number"
                        id="quantity"
                        min="0"
                        value={quantity}
                        onChange={handlerChange}
                        placeholder="Product's Quantiry" 
                        required/>
                </div>
                <p className="error">{stock.fetchError}</p>
                { userInfo && userInfo.role === "ADMIN" ?
                <button
                    disabled={ name === "" || type === "Type" || quantity === '' || avatar === '' ? true : false }
                >
                    {
                        !loading ? Done ? 'Done !': 'Create' : <Loader color={"rgb(255, 255, 255)"}/>
                    }
                </button> : <p>Not Allowed To Create</p> }
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    stock: state.stock,
    authInfo: state.auth
})

const mapDispatchToProps = dispatch => ({
    createProd : (payload) => dispatch(createProduct(payload))
})

export default connect(mapStateToProps,mapDispatchToProps)(NewProduct);
