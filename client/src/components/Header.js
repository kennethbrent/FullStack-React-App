import React from 'react';
import UserSignOut from './UserSignOut';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return(
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo"><NavLink to="/">Courses</NavLink></h1>
                {!props.user ?
                    <nav>
                        <NavLink className='signup' to="/signup">Sign up</NavLink>
                        <NavLink className="signin" to="/signin">Sign in</NavLink>
                    </nav>:
                    <UserSignOut handleSignOut={props.handleSignOut} user={props.user}/>
                }
            </div>
        </div>
    );
}  

export default Header