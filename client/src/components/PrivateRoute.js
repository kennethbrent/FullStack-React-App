import React  from 'react';
import {Route, Redirect} from 'react-router-dom';
import UserSignIn from './UserSignIn';

const PrivateRoute =  ({ component: Component, ...props}) => {
    const {authenticatedUser} = props
    if(authenticatedUser){
        return(
            <Route
            {...props}
            render={({match}) => <Component match={match} authenticatedUser={authenticatedUser}/>}
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

{/**
            <Route path='/courses/:id/update' render={({match})=> <UpdateCourse match={match} authenticatedUser={this.state.authenticatedUser}/> } />
*/}