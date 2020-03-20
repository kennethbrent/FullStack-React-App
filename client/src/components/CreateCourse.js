import React, {Component} from 'react'
import { NavLink} from 'react-router-dom';

class CreateCourse extends Component {
    state = {
        error: null
    }
    ///Create a new course based on input ref values
    //Returns validation errors and renders them if necessary
    //Redirects to location header that is returned from api or error route/component 
    handleCreateCourse = (e) =>{
        e.preventDefault()
        const encodedCredentials = btoa(`${this.props.authenticatedUser.emailAddress}:${this.props.authenticatedUser.password}`);
        const courseObject = {
            title: this.title.value,
            description: this.description.value,
            estimatedTime: this.estimatedTime.value,
            materialsNeeded: this.materialsNeeded.value
        }
     
     
        if(window.confirm("Are you sure you're ready to create this course?")){
            fetch(`http://localhost:5000/api/courses`, {
                method: 'POST',
                mode: 'cors', 
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": `Basic ${encodedCredentials}`,
                  "Access-Control-Expose-Headers": Location
        
                },
                body: JSON.stringify(courseObject) 
            })
            .then(res => {
                if(!res.ok){
                    res.text()
                    .then(text => {throw Error(text)})
                    .catch(err =>{
                        this.setState({error: err.message})
                    })
                } else{
                    const location = res.headers.get('Location')
                    this.props.history.push(location)
                }
            })
            .catch(error =>{
                console.log(error);
                this.props.history.push('/error')
            })
        }
    }
    render(){
        return(
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    {this.state.error ?
                    <div className="validation_error_container">
                        <h2 className="validation--errors--label">Validation errors</h2>
                        <div className="validation-errors">
                            <ul>
                                    <li>{this.state.error}</li>
                            </ul>
                        </div>
                    </div>
                    :
                    null
                    }

                    <form onSubmit={this.handleCreateCourse}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                <input 
                                    id="title" 
                                    name="title" 
                                    type="text" 
                                    className="input-title course--title--input" 
                                    placeholder="Course title..."
                                    defaultValue=""
                                    ref={title=> this.title = title}
                                    />
                                </div>
                                <p>By Authenticated User</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea
                                         id="description" 
                                         name="description" 
                                         className="" 
                                         placeholder="Course description..."
                                         ref={description=> this.description = description}
                                         >
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course-stats-list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input 
                                                id="estimatedTime" 
                                                name="estimatedTime" 
                                                type="text" 
                                                className="course--time--input"
                                                placeholder="Hours" 
                                                defaultValue=""
                                                ref={estimatedTime=> this.estimatedTime = estimatedTime}
                                                />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea 
                                                id="materialsNeeded" 
                                                name="materialsNeeded" 
                                                className="" 
                                                placeholder="List materials..."
                                                ref={materialsNeeded=> this.materialsNeeded= materialsNeeded}
                                                >
                                                </textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Create Course</button>
                            <button className="button button-secondary" type="button"><NavLink to="/">Cancel</NavLink></button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateCourse