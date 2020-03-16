import React from 'react';
import UserSignOut from './UserSignOut';

const Header = (props) => {
    return(
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo"><a href="/">Courses</a></h1>
                {!props.authenticatedUser ?
                    <nav>
                        <a className='signup' href="/signup">Sign up</a>
                        <a className="signin" href="/signin">Sign in</a>
                    </nav>:
                    <UserSignOut handleSignOut={props.handleSignOut}/>
                }
               
                {/**
                  
                */}
      
            </div>
        </div>
    );
}  

export default Header