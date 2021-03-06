import moment from 'moment';

import { ACTION_TYPES } from '../constants/action-types';
import Posts from '../records/posts';
import Post from '../records/post';

const initialState = new Posts();

const getPosts = (posts) => {
    return posts.map(post => {
        return new Post({
            id: post.id,
            title: post.title,
            subtitle: post.subtitle,
            text: post.text,
            excerpt: post.excerpt,
            tags: post.tags,
            comments: post.comments,
            category: post.category,
            author: post.author,
            imageUrl: post.imageUrl,
            dateCreate: moment(post.dateCreate).format('LL'),
            dateUpdate: moment(post.dateUpdate).format('LL'),
            authorId: post.userId,
            authorImg: post.userImg
        });
    });
}

const findIndexPost = (state, id) => {
    let indexPost;
    state.get(-1).map((post, index) => {
        if (post.get('id') === id) {
            indexPost = index;
        };

        return indexPost;
    });

    return indexPost;
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES.FETCH_POSTS:
            return state.setIn([action.payload.categoryId, 'isFetching'], 'process');
        case ACTION_TYPES.FETCH_POSTS_SUCCESS:
            return state
                .setIn([action.payload.categoryId, 'isFetching'], 'finish')
                .setIn([action.payload.categoryId, 'posts'], getPosts(action.payload.posts))
                .setIn([action.payload.categoryId, 'count'], action.payload.count);
        case ACTION_TYPES.FETCH_POSTS_FAILURE:
            return state.setIn([action.payload.categoryId, 'error'], action.payload.error);
        case ACTION_TYPES.DELETE_POST_SUCCESS:
            return state.setIn(
                [-1, 'posts'], state.getIn([-1,'posts']).filter(post => post.get('id') !== action.payload.id)
            );
        default:
            return state;
    }
};
