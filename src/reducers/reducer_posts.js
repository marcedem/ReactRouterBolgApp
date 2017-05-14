import _ from 'lodash';
import { FETCH_POSTS } from '../actions';

export default function(state=null, action){
    switch(action.type){
        case FETCH_POSTS:
            console.log(action.payload.data); // [post1, post2]
            // {4: post }
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}