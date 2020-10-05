import React,{ useState } from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../../store/actions/Actions';
import '../../scss/components/stock/new.scss';

const NewProduct = ({ stock,createProd }) => {
    const [ payload, setPayload ] = useState({
        name:'',
        avatar:'',
        type:'Type',
        quantity:'',
    });

    const [ Done, setDone ] = useState(false);

    const { name,avatar,type,quantity } = payload;

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
                <p className="error">{stock.fetchError}</p>
                <button 
                    disabled={ name!== "" && type === "Type" && quantity!=='' && avatar !== '' ? true : false }
                >
                    {Done ? 'Done !': 'Create'}
                </button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    stock: state.stock
})

const mapDispatchToProps = dispatch => ({
    createProd : (payload) => dispatch(createProduct(payload))
})

export default connect(mapStateToProps,mapDispatchToProps)(NewProduct);
