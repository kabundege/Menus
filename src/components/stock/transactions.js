import React,{ useEffect } from 'react';
import moment from "moment";
import { connect } from 'react-redux';
import Loader from "react-spinners/RotateLoader";
import '../../scss/components/stock/trans.scss';
import { AllTrans } from '../../store/actions/Actions';

const Trans = ({ transactions,getTrans }) => {
    useEffect(()=>{ getTrans() },[getTrans])
    const display = (data) => ({__html:data})
    return(
        <>
        <div className="pagination">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
        </div>
        <div className="transactions">
            { transactions[0] ?
                transactions.map(trans=>(
                    <div key={trans.id} className=" trans">
                      <div className="input-field">
                          <span role="img" aria-label="visible">🙍</span>
                          <span>{trans.author_name}</span>
                      </div>
                      <div className="input-field">
                          <span role="img" aria-label="visible">🍷</span>
                          <span>{trans.product_name}</span>
                      </div>
                      <div className="input-field">
                          <span role="img" aria-label="visible">📑</span>
                          <span dangerouslySetInnerHTML={display(trans.details)}/>
                      </div>
                      <div className="input-field">
                          <span role="img" aria-label="visible">📅</span>
                          <span>{moment(trans.createdAt).calendar()}</span>
                      </div>
                    </div>
                )): <div className="loader"><Loader size={100} color={"orange"}/></div>
            }
        </div>
        </>
    )
}

const mapStateToProps = state => ({
    transactions: state.stock.transactions
})

const mapDispatchToProps = dispatch => ({
    getTrans : ()  => dispatch(AllTrans())
})

export default connect(mapStateToProps,mapDispatchToProps)(Trans);
