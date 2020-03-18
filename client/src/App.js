import React, {Component} from 'react';
import Courses from './components/Courses'
import {BrowserRouter, Route, Switch, Redirect} from  'react-router-dom';
import './App.css';
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import PrivateRoute from './components/PrivateRoute';
import Cookies from 'js-cookie';

class App extends Component {
  state={
    authenticatedUser: Cookies.getJSON('authenticatedUser')|| null
  }

  handleSignIn = (emailAddress,password) =>{
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
            }) 
            .then(data => {
              if(data) {
                data.user.password = password
                this.setState({
                  authenticatedUser: data.user
                })
                Cookies.set('authenticatedUser', JSON.stringify(data.user) ,{expires: 1})
                window.location.href="/courses"
              }
            })
            .catch((error) =>{
                console.log(error)
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
            <Route path='/courses/:id' render={({match})=> <CourseDetail match={match} authenticatedUser={this.state.authenticatedUser}/> } />
            <Route path='/signin' render={()=> <UserSignIn handleSignIn={this.handleSignIn} />}/>
            <Route path='/signup' render={()=> <UserSignUp handleSignIn={this.handleSignIn} />}/>
            <Redirect exact from='/signout' to="courses" />
            {/**
            <Route exact path='/search/atlanta' render={()=> <PhotoContainer state={this.state} photos={this.state.atlanta}/>}/>
            <Route exact path='/search/golf' render={()=> <PhotoContainer state={this.state} photos={this.state.golf}/>}/>
            <Route exact path='/search/coding' render={()=> <PhotoContainer state={this.state} photos={this.state.coding}/>}/>
            <Route path='/search/:searchterm' render={({match})=> <PhotoContainer state={this.state} photos={this.state.photos} match={match} handleSearch={this.handleSearch}/>}/>
            <Route component={NotFound} />
            */}

          </Switch>
        </div>
      </BrowserRouter>
    );
    }
}

export default App;
