import React from 'react';
import { connect } from 'react-redux';

const Trans = ({ transactions }) => {
    return(
        <div className="container">
            Transactions
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