import React, {Component} from 'react';

class CourseDetail extends Component {
    state = {
        course: [],
        isLoading: true,
        author: '',
        materials: []
    }

    handleDeleteCourse = () => {
        if(window.confirm('Are you sure you want to delete this course?')){
            fetch(`http://localhost:5000/api/courses/${this.state.course.id}`, {
                method: 'DELETE'
            })
            .then(res => res.text()) // or res.json()
            .then(res => console.log(res))
            .catch(error =>{
                console.log(error)
            })
        }
    }



    componentDidMount(){
        if(this.props.match){
            const {match} = this.props;
            fetch(`http://localhost:5000/api/courses/${match.params.id}`)
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    course: result,
                    author: result.User.firstName + " " + result.User.lastName,
                    isLoading: false
                }, ()=>{
                    if(this.state.course.materialsNeeded){
                        this.setState({
                            materials: result.materialsNeeded.split('* ')
                        })
                    }
                })
            })
            .catch((error)=>{
                console.log(error)
            })
        }
     

    }
    render(){
        this.state.materials.shift()
        return(
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                <a className="button" href={`/courses/${this.state.course.id}/update`}>Update Course</a>
                                <a className="button" href={this.props.history} onClick={this.handleDeleteCourse}>Delete Course</a>
                            </span>
                            <a className="button button-secondary" href="/">Return to List</a>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className='course--title'>{this.state.course.title}</h3>
                            <p>{this.state.author}</p>
                        </div>

                        <div className="course--description">
                            <p>{this.state.course.description}</p>
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
                    {this.state.isLoading ? <p>k</p>:
                        <React.Fragment>
                        {this.state.materials.map((item,index)=>{
                            return(
                                <li key={index}>{item}</li>
                            );
                        })}
                        </React.Fragment>
                    }
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default CourseDetail