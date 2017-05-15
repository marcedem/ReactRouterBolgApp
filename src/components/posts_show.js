import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSinglePost, deletePost } from '../actions'

class PostsShow extends Component {
    componentDidMount(){
        // this.props.match.params.id is provided by react
        const { id } = this.props.match.params;
        this.props.fetchSinglePost(id);
    }

    onDeleteClick(){
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        // posts[this.props.match.params.id]; // the post we want to show
        // this.props === ownProps
        const { post } = this.props;
        // make sure that the record is present before rendering
        if(!post){
            return (
                <div>Loading ...</div>
            );
        }
        if(!post && post.id === undefined){
            return (
                <div>Ups .. Seems like post is deleted ...</div>
            );
        }
        return(
            <div>
                <Link to="/">Back</Link>

                <button 
                    className="pull-xs-right btn btn-danger"
                    onClick={this.onDeleteClick.bind(this) }>
                    <span> Delete a Post </span>
                </button>

                
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

export default connect(mapStateToProps, { fetchSinglePost, deletePost })(PostsShow);