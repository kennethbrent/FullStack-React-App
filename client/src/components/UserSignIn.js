import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
class UserSignIn extends Component {

    handleSubmit =(e) => {
        e.preventDefault()
        let location;
        if(this.props.location){
            location = this.props.location.from.pathname
        } else {
            location = '/courses'
        }
        this.props.handleSignIn(this.username.value,this.password.value, location, this.props.history)
    }

    render(){
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div><input
                                 id="emailAddress" 
                                 name="emailAddress"
                                 type="text" 
                                 placeholder="Email Address"
                                 ref={username=> this.username = username}
                                />
                            </div>
                            <div><input 
                                id="password" 
                                name="password" 
                                type="password" 
                                placeholder="Password"
                                ref={password=> this.password = password}
                                /></div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign In</button>
                                <button className="button button-secondary"><NavLink to="/">Cancel</NavLink></button>
                            </div>
                        </form>

                        <p>Dont have a user account? <NavLink to="/signup">Click here to sign up!</NavLink></p>
                    </div>
                </div>
            </div>
        );
    }
}


export default UserSignIn