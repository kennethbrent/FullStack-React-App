import React from 'react';

const UserSignOut = (props) => {
    return(
        <nav>
            <span>Welcome {props.user.firstName} {props.user.lastName}</span>
            <a className='signout' href="/" onClick={props.handleSignOut}>Sign out</a>
        </nav>
    
    );
}  

export default UserSignOut