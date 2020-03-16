import React from 'react';

const UserSignOut = (props) => {
    return(
        <nav>
            <span>Welcome autenticatedUser</span>
            <a className='signout' href="/signout" onClick={props.handleSignOut}>Sign out</a>
        </nav>
    
    );
}  

export default UserSignOut