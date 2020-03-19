import React from 'react';
import { NavLink} from 'react-router-dom';

const Forbidden = () => {
    return(
        <div className="bounds">
            <h1>You little rascal</h1>
            <p>Nice try but you aren't authorized to update the selected course.</p>
            <NavLink className="button button-secondary" to="/courses">Return to List</NavLink>
        </div>

    );
}

export default Forbidden