import axios from 'axios';

// bring in types
import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR, UPDATE_PROFILE, ACCOUNT_DELETED, CLEAR_PROFILE, GET_REPOS } from './types';

// bring in actions
import { setAlert } from './alertActions';

// get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (err) {
        dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
    }
};

// get all profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('/api/profile');
        dispatch({ type: GET_PROFILES, payload: res.data });
    } catch (err) {
        dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
    }
};

// get profile by id
export const getProfileById = (userid) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/user/${userid}`);
        dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (err) {
        dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
    }
};

// get users gitHub repos
export const getGitHubRepos = (username) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({ type: GET_REPOS, payload: res.data });
    } catch (err) {
        dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
    }
};

// create or update profile
export const createProfile = (formData, history, edit = false) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        // redirect if new (i.e. created) profile; stay on form if edit
        if (!edit) {
            history.push('./dashboard');
        }
    } catch (err) {
        // loop through errors
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
    }
};

// add experience
export const addExperience = (formData, history) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify(formData);

    try {
        const res = await axios.put('/api/profile/experience', body, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });
        dispatch(setAlert('Experience Added', 'success'));

        // redirect to dashboard
        history.push('./dashboard');
    } catch (err) {
        // loop through errors
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
    }
};

// add education
export const addEducation = (formData, history) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify(formData);

    try {
        const res = await axios.put('/api/profile/education', body, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });
        dispatch(setAlert('Education Added', 'success'));

        // redirect to dashboard
        history.push('./dashboard');
    } catch (err) {
        // loop through errors
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
    }
};

// delete experience
export const deleteExperience = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });
        dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
        dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
    }
};

// delete education
export const deleteEducation = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });
        dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
        dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
    }
};

// delete account, profile
export const deleteAccount = (id) => async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone')) {
        try {
            await axios.delete(`/api/profile`);
            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });
            dispatch(setAlert('Your account has been permanently deleted'));
        } catch (err) {
            dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.data.msg, status: err.response.status } });
        }
    }
};
