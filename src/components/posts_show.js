import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSinglePost } from '../actions'

class PostsShow extends Component {
    componentDidMount(){
        // this.props.match.params.id is provided by react
        const { id } = this.props.match.params;
        this.props.fetchSinglePost(id);
    }
    render() {
        // posts[this.props.match.params.id]; // the post we want to show
        // this.props === ownProps
        const { post } = this.props;
        // make sure that the record is present before rendering
        if(!post){
            return <div>Loading ...</div>
        }
        return(
            <div>
                <Link to="/">Back</Link>
                <h2>{post.title}</h2>
                <h5>Categories: {post.categories}</h5>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps){
   // return { posts };
   return { post: posts[ownProps.match.params.id] };

}

export default connect(mapStateToProps, { fetchSinglePost })(PostsShow);