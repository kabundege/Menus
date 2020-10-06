import React from 'react';
import { connect } from 'react-redux';
import Loader from "react-spinners/RotateLoader";
import '../../scss/components/stock/trans.scss';
import moment from "moment";

const Trans = ({ transactions }) => {
    return(
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
                          <span>{trans.details}</span>
                      </div>
                      <div className="input-field">
                          <span role="img" aria-label="visible">📅</span>
                          <span>{moment(trans.createdAt).calendar()}</span>
                      </div>
                    </div>
                )): <div className="loader"><Loader size={100} color={"orange"}/></div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    transactions: state.stock.transactions
})

const mapDispatchToProps = dispatch => ({
    getTrans : ()  => dispatch()
})

export default connect(mapStateToProps,mapDispatchToProps)(Trans);
