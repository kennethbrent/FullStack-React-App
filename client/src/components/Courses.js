import React, {Component} from 'react';
import {NavLink, Redirect} from 'react-router-dom';

class Courses extends Component {
    
    state = {
        courses: [],
        isLoading: true
    }

    componentDidMount(){
        fetch('http://localhost:5000/api/courses')
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    courses: result,
                    isLoading: false
                })
            })
            .catch((error)=>{
                console.log(error);
                return(   <Redirect to="/error" />)
            })      
    }

    render(){
        return(
            <div className="bounds">
                {this.state.courses.map((course, index)=>{
                    return (
                        <div className="grid-33" key={index}>
                            <NavLink className="course--module course--link" to={`/courses/${course.id}`}>
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{course.title}</h3>
                            </NavLink>
                        </div>
                    );
                })}
                <div className="grid-33">
                <NavLink className="course--module course--add--module" to={`/courses/create`}>
                    <h3 className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>
                        New Course
                    </h3>
                </NavLink>
            </div>
            </div>
        );
    }
}

export default Courses