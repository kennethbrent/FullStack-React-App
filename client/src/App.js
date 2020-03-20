//Modules
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from  'react-router-dom';
import Cookies from 'js-cookie';

//styles
import './App.css';

////components
import Courses from './components/Courses'
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import Error from './components/Error'


class App extends Component {
  state={
    authenticatedUser: Cookies.getJSON('authenticatedUser')|| null
  }

  ////sign in callback passed down through props to UserSignUp and UserSignIn components
  handleSignIn = (emailAddress,password , location, history) =>{
      const encodedCredentials = btoa(`${emailAddress}:${password}`);
        const auth = new Headers({
            "Authorization": `Basic ${encodedCredentials}`,
          });
        const optionsObj = {  
            method: 'GET',
            headers: auth,
          }
        fetch('http://localhost:5000/api/users', optionsObj)
            .then(res => {
              if(res.status === 200){
                return res.json()
              }
              else {
                console.log(res.status)
              }
            }) 
            .then(data => {
              if(data) {
                data.user.password = password
                this.setState({
                  authenticatedUser: data.user
                })
                Cookies.set('authenticatedUser', JSON.stringify(data.user) ,{expires: 1});
                history.push(location)
              }
            })
            .catch((error) =>{
                history.push('/error')
            })
    }

    handleSignOut = () =>{
      this.setState({authenticatedUser: null}, ()=>{
        Cookies.remove('authenticatedUser')
      })
    }



  render(){
    return (
      <BrowserRouter>
        <div className="container">
        <Header user={this.state.authenticatedUser} handleSignOut={this.handleSignOut}/>
          <Switch>
            <Redirect exact from='/' to='/courses'/> 
            <Route exact path='/courses' render={()=> <Courses/>}/>
            <PrivateRoute authenticatedUser={this.state.authenticatedUser} path="/courses/create" component={CreateCourse} />
            <PrivateRoute authenticatedUser={this.state.authenticatedUser} path='/courses/:id/update' component={UpdateCourse}/>
            <Route path='/courses/:id' render={({match, history})=> <CourseDetail match={(match)} authenticatedUser={this.state.authenticatedUser} history={history}/> } />
            <Route path='/signin' render={({location , history})=> <UserSignIn handleSignIn={this.handleSignIn}  location={location.state} history={history}/>}/>
            <Route path='/signup' render={({history})=> <UserSignUp handleSignIn={this.handleSignIn} history={history} />}/>
            <Redirect exact from='/signout' to="courses" />
            <Route path='/notfound' component={NotFound}/>
            <Route path='/forbidden' component={Forbidden} />
            <Route path="/error" component={Error} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
    }
}

export default App;
