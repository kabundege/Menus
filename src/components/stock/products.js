import React,{ useState,useEffect } from 'react';
import { connect } from 'react-redux' ;
import { Link } from 'react-router-dom';
import Loader from "react-spinners/RotateLoader";
import '../../scss/components/stock/products.scss';
import { AllProducts,deleteProduct } from '../../store/actions/Actions';

const Products = ({ products,getProducts,authInfo,deleteProd }) => {
    const { loading,userInfo } = authInfo;
    const { role } = userInfo;
    const [ ProdType,setProdType ] = useState();

    useEffect(()=>{ getProducts() },[getProducts])

    let data;

    data = ProdType ?
        products.filter(prod => prod.type === ProdType) :
        products;
    if(!loading)
    return (
        <div className="products">
            <section>
                <span onClick={()=> setProdType('goods')}>Goods</span>
                <span onClick={()=> setProdType('')}>All</span>
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
                                <span>Worth</span>
                                <span>{prod.price} <strong style={{color:"orange",fontWeight:"bold"}}>Rwf</strong></span>
                            </p>
                            <p>
                                <span style={{borderBottomRightRadius:"30px"}}>Delivery</span>
                                <span>{prod.avatar}</span>
                            </p>
                            <p>
                                <Link to={'/stock/product/'+prod.id}><i className="far fa-eye"></i></Link>

                                {   role === "ADMIN" &&
                                    <span
                                    onClick={()=>window.confirm("Are You Sure")&&deleteProd(prod.id)}
                                    ><i className="fas fa-trash"></i></span>
                                }
                            </p>
                        </div>
                    )): <h3 className="grey-text center">None Found ☣</h3>
                    }
            </div>
        </div>
    )
    return <div className="loader"><Loader size={100} color={"orange"}/></div>
}

const mapStateToProps = state => ({
    products: state.stock.products,
    authInfo: state.auth,
})

const mapDipatchToProps = dispatch => ({
    getProducts:() => dispatch(AllProducts()),
    deleteProd:(id) => dispatch(deleteProduct(id))
})

export default connect(mapStateToProps,mapDipatchToProps)(Products);
