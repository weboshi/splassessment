import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import registrationApi from '../../Data/registration-api';
import axios from 'axios';
import { UPDATE, INITIALIZE, UPDATEAMOUNT, LOGIN } from "../../Redux/actions/index";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './listing.css'


const mapDispatchToProps = dispatch => {
    return {
      UPDATE: newSettings => dispatch(UPDATE(newSettings)),
      INITIALIZE: firstSettings => dispatch(INITIALIZE(firstSettings)),
      UPDATEAMOUNT: newTotal => dispatch(UPDATEAMOUNT(newTotal)),
      LOGIN: userInfo => dispatch(LOGIN(userInfo))
    };
  };

const mapStateToProps = (state) => {
return { user: state.user, settings: state.settings};
};


class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: 0,
            error: 0,
            errorMessage: "Something went wrong! Post was not created.",
            successMessage: "Your message was created!"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleSubmit() {
        axios({
            method: 'post',
            url: '/api/job/newJob/',
            data: {
                title: this.state.title,
                posting: this.state.posting,
                username: this.props.user.username,
            }})
            .then(res => {
            console.log(res)
            if (res.code = 200) {
                console.log("Post succcessfully created!")
                this.setState({
                    success: 1,
                    title: "",
                    posting: "",
                    username: "",
                })
            }
            else {
                console.log("Post not created.")

                this.setState({
                    error: 1
                })
            }
            }).catch(err => console.log(err))
            // window.location.reload(true)
            }
    

    validateForm(){
        if( this.state.title.length > 0 && this.state.posting.length > 0 ){
            return true
        }
        else if (this.state.title.length === 0 && this.state.posting.length === 0){
            this.setState({
                formError: "Please enter a title and post body."
            })
        }
        else if (this.state.title.length === 0 && this.state.posting.length > 0){
            this.setState({
                formError: "Please enter a title."
            })
        } 
        else if (this.state.title.length > 0 && this.state.posting.length === 0){
                this.setState({
                formError: "Please enter a post."
                })
        }
    }

      handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        this.setState({
          [name]: value
        });
  
      }

    render() {
        return (
            <div className='form-container'>  
                <div className='form-component'>
                    <div className='create-label'>
                        <h2>Create a Post</h2>
                    </div>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={this.state.title} onChange={this.handleChange} name="title" type="email" placeholder="Insert title here..." />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Message Body</Form.Label>
                            <Form.Control value={this.state.posting} onChange={this.handleChange} name="posting" type="posting" placeholder="Type your message here..." />
                        </Form.Group>
                        <Form.Group>
                        <Button onClick={this.handleSubmit}>Submit New Post</Button> 
                            {this.state.error === 1 && (
                            <div className="failure-block">
                                <i style={{fontSize:"1em",color:"red"}} class="fas fa-times-circle"></i>  
                                {" " + this.state.failureMessage} 
                            </div>
                            )} 
                            
                            {this.state.success === 1 && (
                            <div className="success-block">
                                <i style={{fontSize:"1em",color:"green"}} class="fas fa-check-circle"></i>  
                                {" " + this.state.successMessage} 
                            </div>
                            )}
                        </Form.Group>
                    </Form>
                </div>
            </div>
        )
    }
}

export const ListingForm = connect(mapStateToProps, mapDispatchToProps)(Listing);