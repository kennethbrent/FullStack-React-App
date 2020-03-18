import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class UserSignUp extends Component {
    state = {
        error: null
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.password.value === this.confirmPassword.value){
            const userObject = {
                firstName: this.firstName.value,
                lastName:this.lastName.value,
                emailAddress: this.emailAddress.value,
                password: this.password.value
            }
            fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(userObject) // body data type must match "Content-Type" header
            })
            .then(res => {
                if(!res.ok){
                    res.text()
                    .then(text => {throw Error(text)})
                    .catch(err =>{
                        this.setState({error: err.message})
                    })
                } else if(res.status === 201){
                    this.props.handleSignIn(this.emailAddress.value, this.password.value)
                }
            })
            .catch(err =>{
                console.log(err.msg)
            })
        } else {
            alert('Passwords must match')
        }
    }

    render(){
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up<span className="error_message">err</span></h1>
                    <div className="validation-errors">
                    <ul>
                       <li>{this.state.error}</li>
                    </ul>
                    </div>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div><input
                             id="firstName" 
                             name="firstName" 
                             type="text" 
                             placeholder="First Name"
                             ref={firstName => this.firstName = firstName}
                             />
                             </div>
                            <div><input
                             id="lastName" 
                             name="lastName" 
                             type="text" 
                             placeholder="Last Name"
                             ref={lastName => this.lastName = lastName}
                             />
                             </div>
                            <div><input
                             id="emailAddress" 
                             name="emailAddress" 
                             type="text" 
                             placeholder="Email Address"
                             ref={emailAddress=> this.emailAddress = emailAddress}
                             />
                             </div>
                            <div><input
                             id="password" 
                             name="password" 
                             type="password" 
                             placeholder="Password"
                             ref={password=> this.password = password}
                             />
                             </div>
                            <div><input
                             id="confirmPassword" 
                             name="confirmPassword" 
                             type="password" 
                             placeholder="Confirm sPassword"
                             ref={confirmPassword=> this.confirmPassword = confirmPassword}/>
                             </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign Up</button>
                                <button className="button button-secondary"><NavLink to="/">Cancel</NavLink></button>
                            </div>
                        </form>

                        <p>Already have an account? <NavLink to="/signin">Click here to sign in!</NavLink></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserSignUp
