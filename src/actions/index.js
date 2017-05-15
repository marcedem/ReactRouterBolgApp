import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_SINGLE_POST = 'fetch_single_post';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete_post';

const ROOT_URL ='http://reduxblog.herokuapp.com/api';
const API_KEY='?key=RRBA9876';

export function fetchPosts(){
    const  request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    return {
        type: FETCH_POSTS,
        payload: request
    };
}
// action creator for creating a new post and dynamically nagivation back to index page
export function createPost(values, callback){
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values )
    .then( () => callback() ); // promise success

    return {
        type: CREATE_POST,
        payload: request
    }
}

export function fetchSinglePost(id){
    const  request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return {
        type: FETCH_SINGLE_POST,
        payload: request
    };
}

export function deletePost(id, callback){
    const  request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then( () => callback() ); // promise success
    
    return {
        type: DELETE_POST,
        payload: id
    };
}