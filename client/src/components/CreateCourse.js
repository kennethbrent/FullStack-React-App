import React, {Component} from 'react'

class CreateCourse extends Component {

    handleCreateCourse = (e) =>{
        e.preventDefault()
        if(window.confirm("Are you sure you're ready to create this course?")){
            fetch(`http://localhost:5000/api/courses`, {
                method: 'POST'
            })
            .then(res => res.text()) // or res.json()
            .then(res => console.log(res))
            .catch(error =>{
                console.log(error)
            })
        }
    }
    render(){
        return(
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    <div>
                        <h2 className="validation--errors--label">Validatin errors</h2>
                        <div className="validation-errors">
                            <ul>
                                <li>Please provide a defaultValue for Tite</li>
                                <li>Please provide a defaultValue for "Description"</li>
                            </ul>
                        </div>
                    </div>
                    <form onSubmit={this.handleCreateCourse}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                                  defaultValue=""/>
                                </div>
                                <p>By Authenticated User</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea id="description" name="description" className="" placeholder="Course description..."></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course-stats-list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                            placeholder="Hours" defaultValue=""/>
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..."></textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Create Course</button>
                            <button className="button button-secondary"><a href="/">Cancel</a></button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateCourse