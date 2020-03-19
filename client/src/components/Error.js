import React from 'react';
import { NavLink} from 'react-router-dom';

const Error = () => {
    return(
        <div className="bounds">
            <h1>Woah - you wrecked us.</h1>
            <p>
            Just kidding - its likely a problem on our end.
            An unexpected error has occured and the server responded with error code 500.
            </p>
            <NavLink className="button button-secondary" to="/courses">Return to List</NavLink>
        </div>

    );
}

export default Error