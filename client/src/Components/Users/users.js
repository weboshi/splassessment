import React, { Component } from 'react'
import axios from 'axios';
import { UPDATEPROFILE } from '../../Redux/actions/index';
import { Card, CardGroup, ListGroup, ListGroupItem, Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';
import './users.css';

const mapDispatchToProps = dispatch => {
    return {
            UPDATEPROFILE: updatedInfo => dispatch(UPDATEPROFILE(updatedInfo))
    };
};

const mapStateToProps = (state) => {
    return { user: state.user};
};

const UserPanel = (props) => {
    return(
    <div className="jobs-panel">
        <span onClick={() => props.onClick()} className="bookmark">
        <i className="far fa-bookmark"></i>
        </span>
        <span className='format-date'>{props.formatDate()}</span>
        <span>{props.username}</span>
    </div>  
    )}

const UserPanelBookmarked = (props) => {
    return (
    <div className="jobs-panel">
        <span onClick={() => props.onClick()} className="bookmark-following">
            <i className="fas fa-bookmark"></i>
        </span>
        <span className='format-date'>{props.formatDate()}</span>
        <span>{props.username}</span>
    </div>
    )}


class UsersComponent extends Component { 
    constructor(props){
        super(props);
        this.state = {
            panel: 1,
            card: 0,
            refresh: 0,
        }
        this.handleChange = this.handleChange.bind(this)
        this.mapJobsAsPanels = this.mapJobsAsPanels.bind(this)
        this.switchToPanel = this.switchToPanel.bind(this)
        this.formatDate = this.formatDate.bind(this)
        this.getFollows = this.getFollows.bind(this)
        this.getUserList = this.getUserList.bind(this)

    }

    componentDidMount() {
        axios({
            method: 'get',
            url: `/api/user/getUserbookmarks/${this.props.user.username}`
        }).then(res => {
            console.log(res.data)
            this.setState({
                following: res.data
            })
        }).catch(err => console.log(err)).then(
            axios({
            method: 'get',
            url: `/api/user/getUsers`,
            }).then(res => {
                console.log(res.data)
                this.setState({
                    userListings: res.data
                })
            }).catch(err => console.log(err)))
    }

    getFollows() {
        console.log("Getting follows")
        axios({
            method: 'get',
            url: `/api/user/getUserbookmarks/${this.props.user.username}`
        }).then(res => {
            console.log(res.data)
            this.setState({
                following: res.data
            }, () => console.log(this.state))
        }).catch(err => console.log(err))
    }

    getUserList() {
        axios({
            method: 'get',
            url: `/api/user/getUsers`,
            }).then(res => {
                console.log(res.data)
                this.setState({
                    userListings: res.data
                })
            }).catch(err => console.log(err))
    }

    removeBookmark(userId) {
        let username = this.props.user.username
        axios({
            data: {
                bookmark: userId,
            },
            method: 'put',
            url: `/api/user/removebookmark/${username}`,
        }).then(res => {

            if(res.status == 200){
                console.log("Followed")
                this.getFollows()
            }
        }).catch(
            err => console.log(err)
        )
    }

    addBookmark(userId) {
        let username = this.props.user.username
        axios({
            data: {
                bookmark: userId,
            },
            method: 'put',
            url: `/api/user/addbookmark/${username}`,
        }).then(res => {
            if(res.status == 200){
                console.log("Followed")
                this.getFollows()
            }
        }).catch(
            err => console.log(err)
        )
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value
    
        this.setState({
        [name]: value
        }, () => { console.log(this.state)});
    }

    formatDate(date) {
        var formattedDate = DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_SHORT)
        return formattedDate
    }

    mapJobsAsPanels() {
        const myListings = this.state.userListings
        if (this.state.following) {
            return (
                myListings.map((user, i) => (
                    (this.state.following.includes(user.username)) ?
                    <UserPanelBookmarked
                        user={this.props.user.username} 
                        username={user.username} 
                        key={i} 
                        onClick={() => this.removeBookmark(user.username)}
                        formatDate={() => this.formatDate(user.createdAt)}/>
                    :
                    <UserPanel
                        user={this.props.user.username} 
                        username={user.username} 
                        key={i} 
                        onClick={() => this.addBookmark(user.username)}
                        formatDate={() => this.formatDate(user.createdAt)}/>    
                ))
            )
        }
        else {
            return(
                myListings.map((user, i) => (
                    <UserPanel 
                        username={user.username} 
                        key={i} 
                        onClick={() => this.addBookmark(user.username)}
                        formatDate={() => this.formatDate(user.createdAt)}/> 
                    ))
            )
        }
  
    }

    switchToPanel() {
        this.setState({
            panel: 1,
            card: 0
        }, () => console.log(this.state))
    }

    render(){
        return(
            <div className='jobs-container'>
                <div className='jobs-component'>
                    <div className='jobs-label'>
                        <h3 className='jobs-header'>Users</h3>
                        <span>List of users.</span>
                    </div>
                        {this.state.userListings && this.state.panel == true && this.mapJobsAsPanels()}
                    <div className="loading">
                        {!this.state.userListings && <div className="loading-icon"><i className="fas fa-spinner fa-spin"></i></div>}
                    </div>
                    
                </div>
            </div>
        )
    }
}

export const Users =  connect(mapStateToProps, mapDispatchToProps)(UsersComponent)