import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import {NavLink, Redirect} from 'react-router-dom';
class CourseDetail extends Component {
    state = {
        isLoading: true,
        author: '',
        materials: []
    }

    /////delete course uses 

    handleDeleteCourse = (e) => {
        e.preventDefault()
        const encodedCredentials = btoa(`${this.props.authenticatedUser.emailAddress}:${this.props.authenticatedUser.password}`);
        if(window.confirm('Are you sure you want to delete this course?')){
            fetch(`http://localhost:5000/api/courses/${this.state.course.id}`, {
                method: 'DELETE',
                mode: 'cors', 
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": `Basic ${encodedCredentials}`
                }
            })
            .then(res => this.props.history.push('/courses')) // or res.json()
            .catch(error =>{
                console.log(error)
                return(
                    this.props.history.push('/error')
                )
            })
        }
    }



    componentDidMount(){
        ////fetch course data if there is param value
        if(this.props.match){
            const {match} = this.props;
            fetch(`http://localhost:5000/api/courses/${match.params.id}`)
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    course: result,
                    isLoading: false
                })
            })
            .catch((error)=>{
                console.log(error);
                return(   <Redirect to="/error" />)
            })
        }
    }
    render(){
        return(
            <div>
                {this.state.isLoading ?
                    null
                    :
                    this.state.course.User ?
                    <div>
                    <div className="actions--bar">
                        <div className="bounds">
                            <div className="grid-100">
                                {this.props.authenticatedUser ?
                                this.props.authenticatedUser.id === this.state.course.userId ?
                                <React.Fragment>
                                    <span>
                                        <NavLink className="button" to={`/courses/${this.state.course.id}/update`}>Update Course</NavLink>
                                        <NavLink className="button" to='/' onClick={this.handleDeleteCourse}>Delete Course</NavLink>
                                    </span>
                                    <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                                </React.Fragment>
                                : 
                                <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                                :
                                <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="bounds course--detail">
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <h3 className='course--title'>{this.state.course.title}</h3>
                                <p>{this.state.course.User.firstName} {this.state.course.User.lastName}</p>
                            </div>

                            <div className="course--description">
                                <ReactMarkdown>
                                    {this.state.course.description}
                                </ReactMarkdown>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <h3>{this.state.course.estimatedTime}</h3>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <ul>
                                            <ReactMarkdown>
                                                    {this.state.course.materialsNeeded}
                                            </ReactMarkdown>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    </div>
                        :
                        <Redirect to="/notfound"/>
                }
            </div>

        );
    }
}

export default CourseDetail