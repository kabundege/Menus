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
            <NavLink to="/stock/product/:id">
                <span>Update Product</span> <i className="far fa-eye"></i>
                </NavLink> 
        </li>
        <li>
            <NavLink to="/stock/create">
                <span>Create Product</span> <i className="far fa-eye"></i>
            </NavLink>
        </li>
        <li>
            <NavLink to="/stock/transactions">
                <span>Transactions</span> <i className="far fa-eye"></i>
            </NavLink>
        </li>
    </ul>