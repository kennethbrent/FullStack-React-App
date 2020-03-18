import React, {Component} from 'react'

class UpdateCourse extends Component {

    state={
        course: []
    }

    handleUpdateCourse = (e) =>{
        e.preventDefault()
        const encodedCredentials = btoa(`${this.props.authenticatedUser.emailAddress}:${this.props.authenticatedUser.password}`);

        const courseObject = {
            title: this.title.value,
            description: this.description.value,
            estimatedTime: this.estimatedTime.value,
            materialsNeeded: this.materialsNeeded.value
        }
     
        if(window.confirm('Are you sure you want to update this course?')){
            fetch(`http://localhost:5000/api/courses/${this.state.course.id}`,{
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": `Basic ${encodedCredentials}`,
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(courseObject) // body data type must match "Content-Type" header
            })
            .then(res => res.text()) // or res.json()
            .then(data => window.location.href= `/courses/${this.state.course.id}`)
            .catch(error =>{
                console.log(error)
            })
        }
    }

    componentDidMount(){
        if(this.props.match){
            const {match} = this.props;
            fetch(`http://localhost:5000/api/courses/${match.params.id}`)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    course: result,
                    author: result.User.firstName + " " + result.User.lastName
                })
            })
            .catch((error)=>{
                console.log(error)
            })
        }
     

    }
    render(){
        return(
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <div>
                        <h2 className="validation--errors--label">Validatin errors</h2>
                        <div className="validation-errors">
                            <ul>
                                <li>Please provide a value for Tite</li>
                                <li>Please provide a value for "Description"</li>
                            </ul>
                        </div>
                    </div>
                    <form onSubmit={this.handleUpdateCourse}>
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
                                    defaultValue={this.state.course.title}
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
                                        defaultValue={this.state.course.description}
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
                                                defaultValue={this.state.course.estimatedTime}
                                                ref={estimatedTime=> this.estimatedTime = estimatedTime}
                                                />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed<span>Start each item with "* "</span></h4>
                                        <div>
                                            <textarea 
                                                id="materialsNeeded" 
                                                name="materialsNeeded" 
                                                className="" 
                                                placeholder="List materials..."
                                                defaultValue={this.state.course.materialsNeeded}
                                                ref={materialsNeeded=> this.materialsNeeded= materialsNeeded}
                                                >
                                            </textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Update Course</button>
                            <button className="button button-secondary"><a href="/">Cancel</a></button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateCourse