import React,{ useState,useEffect } from 'react';
import { connect } from 'react-redux' ;
import { Link } from 'react-router-dom';
import Loader from "react-spinners/RotateLoader";
import '../../scss/components/stock/products.scss';
import { AllProducts } from '../../store/actions/Actions';

const Products = ({ products,getProducts }) => {
    const [ ProdType,setProdType ] = useState();
    useEffect(()=>{ getProducts() },[])

    let data;

    data = ProdType ? 
        products.filter(prod => prod.type === ProdType) :
        products;
    
    return (
        <div className="products">
            <section>
                <span onClick={()=> setProdType('goods')}>Goods</span>
                <span onClick={()=> setProdType('utilities')}>Utilities</span>
            </section>
            <div className="parent">
                { data[0] ?
                    data.map(prod=>(
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
                    )): <div className="loader"><Loader size={100} color={"orange"}/></div>
                    }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    products: state.stock.products
})

const mapDipatchToProps = dispatch => ({
    getProducts:() => dispatch(AllProducts())
})

export default connect(mapStateToProps,mapDipatchToProps)(Products);
