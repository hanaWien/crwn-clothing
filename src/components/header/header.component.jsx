import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {auth} from '../../firebase/firebase.utils';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './header.styles.scss';

const Header = ({currentUser})=>(
    <div className='header'>
        <Link to ="/" className='logo-container'>
            <Logo className='logo'/>
        </Link>
        <div className = 'options'>
            <Link to ="/shop" className='option'>SHOP</Link>
            <Link to ="/shop" className='option'>CONTACT</Link>
            { currentUser ?
              <div className='option' onClick= {()=>auth.signOut()}>SIGN OUT</div>
              :
              <Link to='/signin' className='option'>SIGN IN</Link>
            }
            <CartIcon/>
        </div>
        <CartDropdown/>
    </div>
)
//the state is the root reducer
//the currentUser props - is what will be transfered to our component
//when we need properties from our reducer
const mapStateToProps = state =>({
  currentUser: state.user.currentUser
})
export default connect(mapStateToProps)(Header);