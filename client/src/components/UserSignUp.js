import React, {Component} from 'react';

class UserSignUp extends Component {
    render(){
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <form>
                            <div><input id="firstName" name="firstName" type="text" placeholder="First Name"/></div>
                            <div><input id="lastName" name="lastName" type="text" placeholder="Last Name"/></div>
                            <div><input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address"/></div>
                            <div><input id="password" name="password" type="password" placeholder="Password"/></div>
                            <div><input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm sPassword"/></div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign Up</button>
                                <button className="button button-secondary"><a href="/">Cancel</a></button>
                            </div>
                        </form>

                        <p>Already have an account? <a href="/signin">Click here to sign in!</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserSignUp
