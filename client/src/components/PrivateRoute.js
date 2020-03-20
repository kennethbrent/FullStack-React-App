import React  from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute =  ({ component: Component, ...props}) => {
    const {authenticatedUser} = props
    if(authenticatedUser){
        return(
            <Route
            {...props}
            render={({history, match}) => <Component match={match} authenticatedUser={authenticatedUser} history={history}/>}
        />
        )
    }
    else {
        return(
            <Redirect to={{
                pathname: '/signin',
                state: {from: props.location}
              }}/>
        )
    }
}


export default PrivateRoute 
