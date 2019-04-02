import React, { Component } from 'react'
import axios from 'axios';
import { UPDATEPROFILE } from '../../Redux/actions/index';
import { Card, CardGroup, ListGroup, ListGroupItem, Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';
import { Tweet } from '../Tweet/tweet';
import { PropTypes } from 'prop-types';
import './myfeed.css';

const mapDispatchToProps = dispatch => {
    return {
            UPDATEPROFILE: updatedInfo => dispatch(UPDATEPROFILE(updatedInfo))
    };
  };

  const mapStateToProps = (state) => {
    return { user: state.user};
  };


class FeedComponent extends Component { 
    constructor(props){
        super(props);
        this.state = {
            panel: 1,
            card: 0,
        }
        this.handleChange = this.handleChange.bind(this)
        this.mapPosts = this.mapPosts.bind(this)
        this.formatDate = this.formatDate.bind(this)

    }

        componentDidMount() {
            axios({
                method: 'get',
                url: `api/user/profile/${this.props.user.username}`,
            }).then(res => {
                const userFollows = res.data.following
                axios.get(`/api/job/getFollowPosts/`, {
                    params: {
                        bookmarks: userFollows
                    }
                }).then(res => {
                    console.log(res.data)
                    this.setState({
                        bookmarks: res.data
                    })
                }
                    ).catch(
                        err => console.log(err)
                    )
            })
        }

    addBookmark(jobId) {
        console.log('job id' + jobId)
        var username = this.props.user.username
        axios({
            data: {
                bookmark: jobId,
            },
            method: 'put',
            url: `/api/user/addbookmark/${username}`,
        }).then(res => {
            if(res.code == 200){
                console.log("Bookmarked")
            }
        }).catch(
            err => console.log(err))
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

    mapPosts() {
        const followingPosts = this.state.bookmarks
        return (
            followingPosts.map((job, i) => 
                <Tweet formatDate={() => this.formatDate(job.createdAt)} createdAt={job.createdAt} key={i} posting={job.posting} id={job.id} />
            )
        )
    }

    render(){
        return(
            <div className='jobs-container'>
                <div className='jobs-component'>
                    <div className='jobs-label'>
                        <h3 className='jobs-header'>My Feed</h3>
                        <span>Posts from users you are following.</span>
                    </div>
                        {this.state.bookmarks && this.state.panel == true && this.mapPosts()}
                        {!this.state.bookmarks && <div className="loading-icon"><i className="fas fa-spinner fa-spin"></i></div>}
                </div>
            </div>
        )
    }
}

FeedComponent.propTypes = {
    id: PropTypes.number,
    formatDate: PropTypes.func,
    posting: PropTypes.string,
    key: PropTypes.number
};

export const MyFeed =  connect(mapStateToProps, mapDispatchToProps)(FeedComponent)