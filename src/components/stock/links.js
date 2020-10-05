import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => 
    <ul>
        <li>
            <NavLink to="/stock/view">
                <span>View Product</span> <i className="far fa-eye"></i>
            </NavLink>
        </li>
        <li>
            <NavLink to="/stock/product">
                <span>Update Product</span> <i className="fas fa-marker"></i>
                </NavLink> 
        </li>
        <li>
            <NavLink to="/stock/create">
                <span>Create Product</span> <i className="fas fa-plus-circle"></i>
            </NavLink>
        </li>
        <li>
            <NavLink to="/stock/transactions">
                <span>Transactions</span> <i className="fas fa-exchange-alt"></i>
            </NavLink>
        </li>
    </ul>