import _ from 'lodash';
import React,  { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
    
    // Lifecylce methods from react
    // called automatically by react. Any typo will break this functionality from react to call it
    componentDidMount(){
        this.props.fetchPosts();
    }

    renderPosts(){
        return _.map(this.props.posts, post => {
            return(
                <li className="list-group-item" key={post.id}>
                    {post.title}
                </li>
            );
        });
    }

    render(){
        console.log(this.props.posts);
        return(
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        <span> Add a Post </span>
                    </Link>
                </div>
                <h1> Posts </h1>
                <ul className="list-group">
                    { this.renderPosts() }
                </ul>
            </div>
        );
    }

}

function mapStateToProps(state){
    return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);