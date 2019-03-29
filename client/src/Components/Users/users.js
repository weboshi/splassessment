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


class UsersComponent extends Component { 
    constructor(props){
        super(props);
        this.state = {
            panel: 1,
            card: 0,
        }
        this.handleChange = this.handleChange.bind(this)
        this.mapJobsAsPanels = this.mapJobsAsPanels.bind(this)
        this.switchToCard = this.switchToCard.bind(this)
        this.switchToPanel = this.switchToPanel.bind(this)
        this.formatDate = this.formatDate.bind(this)

    }

    componentDidMount() {
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


    addBookmark(userId) {
        let username = this.props.user.username
        axios({
            data: {
                bookmark: userId,
            },
            method: 'put',
            url: `/api/user/addbookmark/${username}`,
        }).then(res => {
            if(res.code == 200){
                console.log("Followed")
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
        return (
            myListings.map((user, i) => 
            <div className="jobs-panel" key={i}>
                <span onClick={() => this.addBookmark(user.username)} className="bookmark">
                    <i className="far fa-bookmark"></i>
                </span>
                <span className='format-date'>{this.formatDate(user.createdAt)}</span>
                <a href={'/listing/' + user.username}>{user.username}</a>
            </div>
            )
        )
    }


    switchToCard() {
        this.setState({
            panel: 0,
            card: 1
        }, () => console.log(this.state))
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
                    </div>
                        {this.state.userListings && this.state.panel == true && this.mapJobsAsPanels()}
                    <div className="loading">
                        {!this.state.userListings && <div>Loading Users</div>}
                        </div>
                </div>
            </div>
        )
    }
}

export const Users =  connect(mapStateToProps, mapDispatchToProps)(UsersComponent)