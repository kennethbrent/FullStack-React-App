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
import Cookies from 'js-cookie';

class App extends Component {
  state={
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  }

  handleSignIn = (username,password) =>{
      const encodedCredentials = btoa(`${username}:${password}`);
        const auth = new Headers({
            "Authorization": `Basic ${encodedCredentials}`
          });
        const optionsObj = {  
            method: 'GET',
            headers: auth
          }
        fetch('http://localhost:5000/api/users', optionsObj)
            .then(res => {
              if(res.status === 200){
                Cookies.set('authenticatedUser', JSON.stringify(btoa(username)), {expires: 1})
                return res.json()
              }
            }) 
            .then(data => {
              const cookie = Cookies.getJSON('authenticatedUser');
              if(cookie){
                this.setState({
                  authenticatedUser: cookie,
                })
              }
              return data.user.firstName
            })
            .catch(error =>{
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
        <Header authenticatedUser={this.state.authenticatedUser} handleSignOut={this.handleSignOut} user="me"/>
          <Switch>
            <Redirect exact from='/' to='/courses'/> 
            <Route exact path='/courses' render={()=> <Courses/>}/>
            <Route exact path='/courses/create' render={()=> <CreateCourse />}/>
            <Route path='/courses/:id/update' render={({match})=> <UpdateCourse match={match}/> } />
            <Route path='/courses/:id' render={({match})=> <CourseDetail match={match}/> } />
            <Route path='/signin' render={()=> <UserSignIn handleSignIn={this.handleSignIn} />}/>
            <Route path='/signup' render={()=> <UserSignUp />}/>
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
