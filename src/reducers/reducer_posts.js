import _ from 'lodash';
import { FETCH_POSTS, FETCH_SINGLE_POST } from '../actions';

export default function(state = {}, action){
    switch(action.type){
        case FETCH_POSTS:
           // console.log(action.payload.data); // [post1, post2]
            // {4: post }
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_SINGLE_POST:
            const post = action.payload.data;
            /*
            const newState = {...state};
            newState[post.id] = post;
            return newState;
            */

            // with the [], we are not creating arrays, we are rather making some key interpolation
            return { ...state, [action.payload.data.id]: action.payload.data };
        default:
            return state;
    }
}