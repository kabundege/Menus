import React,{ useState } from 'react';
import { connect } from 'react-redux' ;
import { Link } from 'react-router-dom';
import '../../scss/components/stock/products.scss';

const Products = ({ products }) => {
    const [ ProdType,setProdType ] = useState();
    let data;
    
    data = ProdType ? 
        products.filter(prod => prod.type === ProdType) :
        products;
    
    
    return (
        <div className="products">
            <section>
                <span onClick={()=> setProdType('goods')}>Goods</span>
                <span onClick={()=> setProdType('utils')}>Utilities</span>
            </section>
            <div className="parent">
                { data.map(prod=>(
                    <div key={prod.id} className="product">
                        <p>
                            <strong>{prod.name}</strong>
                        </p>
                        <p>
                            <span>Type</span>
                            <span>{prod.type}</span>
                        </p>
                        <p>
                            <span>Quantity</span>
                            <span>{prod.quantity}</span>
                        </p>
                        <p>
                            <span>Delivery</span>
                            <span>{prod.avatar}</span>
                        </p>
                        <p>
                            <Link to={'stock/product/'+prod.id}><i className="far fa-eye"></i></Link>
                            <span 
                                onClick={()=>window.confirm("Are You Sure")}
                            ><i className="fas fa-trash"></i></span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    products: state.stock.products
})

export default connect(mapStateToProps)(Products);
