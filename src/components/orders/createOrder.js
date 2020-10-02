import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createOrder } from '../../store/actions/Actions';
import '../../scss/components/orders/createOrder.scss';

const Order = ({ item,closeModel,newOrder }) => {
    const [ itemCount, setCount ] = useState();
    const [ owner, setOwner ] = useState();
    const [ done, setDone ] = useState(false);
    
    const handlerSubmit = e => {
        e.preventDefault();
        const payload = {
            item:item.id,
            itemCount,
            owner: 'Table ' + owner,
        }
        newOrder(payload)
        setDone(true)
    }

    return (
        <div className="newOrder">
            <span onClick={()=> closeModel(false)}>x</span>
            <form onSubmit={handlerSubmit}>
                <span className="avatar">
                    <img src={item.photoUrl} alt={item.name}/>
                </span>
                <span>
                    <section>
                        <p>Total Cost : { itemCount !== undefined ? itemCount*parseInt(item.price) : 0}</p>
                        <input 
                            type="number" 
                            min='0'
                            value={itemCount}
                            placeholder="Item Count..."
                            onChange={(e)=> setCount(e.target.value)} 
                            required
                            />
                        <input 
                            type="number" 
                            min='0'
                            value={owner}
                            placeholder="Table Number..."
                            onChange={(e)=> setOwner(e.target.value)} 
                            required
                            />
                    </section>
                    <button disabled={done} className="waves-effect waves-light"> { done ? 'Done !' : 'Order'} </button>
                </span>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    newOrder: (payload) => dispatch(createOrder(payload))
})

export default connect(undefined,mapDispatchToProps)(Order);
