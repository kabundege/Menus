import React,{ useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { NavLink,Link,useLocation } from 'react-router-dom';
import '../../scss/components/helpers/nav.scss';
import { tokenAuthAction } from '../../store/actions/Actions';
import avatar from '../../assets/icon.jpg';
import Loader from "react-spinners/PulseLoader";

const svgVariants = {
  hidden: { rotate: -180 },
  visible: { 
    rotate: 0,
    transition: { duration : 1 }
  },
}


const Header = ({ logout,authInfo,tokenAuth }) => {
  const [ Menu, setMenu ] = useState(true)
  const token = localStorage.getItem('token');
  const { width } = window.screen;
  const location = useLocation();

  useEffect(()=>{ if(window.screen.width <= 700)setMenu(false) },[location.pathname])

  if(token!== null){
    if(authInfo.origin_type === null){
      tokenAuth(token);
    }

    const { username,role } = authInfo; 
    
    return (
      <>
        <div className="container ad">
          Made with <i className=" red-text fas fa-heart"></i> <Link target="_blank" to="//github.com/kabundege">Christophe Kwizera</Link>
        </div>
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
            animate={{ x: -6,y:-10 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          >
            { username === null ? <Loader color="white"/> :  
                width <= 700 ?
                <h5>{ `${role}`.toUpperCase()} <br/>{ username }</h5>:
                <h5>{ `${role}`.toUpperCase() + ' ' + username }</h5>
            }
          </motion.div>

          { width <= 700 && <i className="fas fa-bars" onClick={()=> setMenu(!Menu)}></i>}
          
          { Menu && <motion.ul
          initial={{ y: -250}}
          animate={{ y: -10 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          >
            
            { 
                role==="ADMIN" ?
                <>
                  <li> 
                    <NavLink to='/stock'>
                      Stock
                    </NavLink>
                  </li>
                  <li> 
                    <NavLink to='/addStock'>
                      Add-Stock
                    </NavLink>
                  </li>
                  <li> 
                    <NavLink to='/users'>
                      Add-User
                    </NavLink>
                  </li>
                </>:
                <>
                  { role === "BAR" || role === "COOK" ?
                      <li> 
                        <NavLink to="/Create">
                          New-Item
                        </NavLink> 
                      </li> : null
                    }
                  <li>
                    <NavLink to='/Dash'>{ role === 'WAITER' ? 'Dashboard' : 'Items' }</NavLink>
                  </li>
                  <li>
                    <NavLink to='/Orders'>Orders</NavLink>
                  </li>
                </>
            }
            <li className="logout" onClick={async ()=> {
              await logout()
              window.location.assign('/')
            }}>
              Log<span role="img" aria-label="visible">💡</span>ut
            </li>
            { width <= 700 && <span onClick={()=> setMenu(!Menu)}>✖</span>}
            { width <= 700 && <h1> Pasada ☮</h1>}
          </motion.ul>
          }
      </nav>
      </>
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