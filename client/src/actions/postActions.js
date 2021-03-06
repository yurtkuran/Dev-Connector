import axios from 'axios';

// bring in types
import { GET_POSTS, ADD_POST, GET_POST, DELETE_POST, UPDATE_LIKES, ADD_COMMENT, REMOVE_COMMENT, POST_ERROR } from './types';

// bring in actions
import { setAlert } from './alertActions';

// get all posts
export const getPosts = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/posts');
        dispatch({ type: GET_POSTS, payload: res.data });
    } catch (err) {
        dispatch({ type: POST_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
    }
};

// add post
export const addPost = (formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await axios.post('/api/posts', formData, config);
        dispatch({ type: ADD_POST, payload: res.data });
        dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
        dispatch({ type: POST_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
    }
};

// get individual post by post id
export const getPost = (postID) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/posts/${postID}`);
        dispatch({ type: GET_POST, payload: res.data });
    } catch (err) {
        dispatch({ type: POST_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
    }
};

// delete post
export const deletePost = (postID) => async (dispatch) => {
    try {
        await axios.delete(`/api/posts/${postID}`);
        dispatch({
            type: DELETE_POST,
            payload: postID,
        });
        dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
        dispatch({ type: POST_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
    }
};

// add like
export const addLike = (postID) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/posts/like/${postID}`);
        dispatch({ type: UPDATE_LIKES, payload: { postID, likes: res.data } });
    } catch (err) {
        dispatch({ type: POST_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
    }
};

// add comment
export const addComment = (postID, formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await axios.put(`/api/posts/comment/${postID}`, formData, config);
        dispatch({ type: ADD_COMMENT, payload: res.data });
        dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        dispatch({ type: POST_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
    }
};

// remove comment
export const removeComment = (postID, commentID) => async (dispatch) => {
    try {
        await axios.delete(`/api/posts/comment/${postID}/${commentID}`);
        dispatch({ type: REMOVE_COMMENT, payload: commentID });
        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({ type: POST_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
    }
};

// remove like
export const removeLike = (postID) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postID}`);
        dispatch({ type: UPDATE_LIKES, payload: { postID, likes: res.data } });
    } catch (err) {
        dispatch({ type: POST_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
    }
};
