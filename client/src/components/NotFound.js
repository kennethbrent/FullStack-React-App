import React from 'react';
import {NavLink} from 'react-router-dom';

const NotFound = () => {
    return(
        <div className="bounds">
            <h1>404: Page not found</h1>
            <p>Whatcha looking for? Whatever it is - you won't find it here. :)</p>
            <NavLink className="button button-secondary" to="/courses">Return to List</NavLink>
        </div>
    );
}

export default NotFound