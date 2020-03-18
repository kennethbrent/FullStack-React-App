import React from 'react';
import { NavLink } from 'react-router-dom';

const UserSignOut = (props) => {
    return(
        <nav>
            <span>Welcome {props.user.firstName} {props.user.lastName}</span>
            <NavLink className='signout' to="/" onClick={props.handleSignOut}>Sign out</NavLink>
        </nav>
    
    );
}  

export default UserSignOut