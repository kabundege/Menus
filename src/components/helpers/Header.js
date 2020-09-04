import React from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { NavLink,Link } from 'react-router-dom';
import '../../scss/components/nav.scss';
import { tokenAuthAction } from '../../store/actions/Actions';
import avatar from '../../assets/icon.jpg';

const svgVariants = {
  hidden: { rotate: -180 },
  visible: { 
    rotate: 0,
    transition: { duration : 1 }
  },
}

const cartNotification= {
  y: [0, -5],
  x: 0,
  transition: {
    y: {
      yoyo: Infinity,
      duration: 0.25,
      ease: 'easeOut'
    }
  }
}

const Header = ({ logout,authInfo,tokenAuth,cart }) => {
  const token = localStorage.getItem('token');
  if(token!== null){
    if(authInfo.origin_type === null){
      tokenAuth(token);
    }
    const { origin_type,origin_id } = authInfo; 
    return (
      <nav>
          <motion.div className="logo"
            drag
            dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
            dragElastic={0.7}
          >
            <motion.img 
            src={avatar} alt="avatar"
            variants={svgVariants}
              initial="hidden"
              animate="visible"
            ></motion.img>
          </motion.div>
          <motion.div className="title"
            initial={{ y: -250}}
            animate={{ y: -10 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          >
            <h5>{ `${origin_type}`.toUpperCase() + ' ' + origin_id }</h5>
          </motion.div>
          
          <motion.ul
          initial={{ y: -250}}
          animate={{ y: -10 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          >
            <li className="cart">
              <Link to="/cart">
                <i className="fas fa-cart-plus"></i>
              { cart[0]&&(
              <motion.i animate={cartNotification} className="cart-notification fas fa-dot-circle"></motion.i>
              ) }
              </Link>
              </li>
            <li>
              <NavLink to='/dash'>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to='/orders'>Orders</NavLink>
            </li>
            <li className="logout" onClick={async ()=> {
              await logout()
              window.location.assign('/')
            }}>
              Log<span role="img" aria-label="visible">💡</span>ut
            </li>
          </motion.ul>
      </nav>
    )
  }else{
    return(
      <></>
    )
  }
  
}

const mapStateToProps = (state) =>({
  authInfo : state.auth.userInfo,
  cart: state.items.cart,
})

const mapDiatchToProps = (dispatch) => ({
  logout: () => dispatch({type:'Logout',action:{}}),
  tokenAuth: (token) => dispatch(tokenAuthAction(token)),
})

export default connect(mapStateToProps,mapDiatchToProps)(Header);