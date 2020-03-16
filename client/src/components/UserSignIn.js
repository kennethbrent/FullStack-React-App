import React, {Component} from 'react';
class UserSignIn extends Component {

    handleSubmit =(e) => {
        e.preventDefault()    
        this.props.handleSignIn(this.username.value,this.password.value)
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
                                <button className="button button-secondary"><a href="/">Cancel</a></button>
                            </div>
                        </form>

                        <p>Dont have a user account? <a href="/signup">Click here to sign up!</a></p>
                    </div>
                </div>
            </div>
        );
    }
}


export default UserSignIn