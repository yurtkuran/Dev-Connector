import React, { useState } from 'react';
import PropTypes from 'prop-types';

// bring in redux
import { connect } from 'react-redux';

// bring in actions
import { addPost } from '../../actions/postActions';

const PostForm = ({ addPost }) => {
    // init local form data
    const [formData, setFormData] = useState({
        text: '',
    });

    // destructure
    const { text } = formData;

    // on change handler
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // on submit handlers
    const onSubmit = async (e) => {
        e.preventDefault();
        addPost(formData);
        setFormData({ text: '' });
    };

    return (
        <div className='post-form'>
            <div className='post-form-header bg-primary'>
                <h3>Say Something</h3>
            </div>
            <form className='form my-1' onSubmit={onSubmit}>
                <textarea name='text' id='' cols='30' rows='5' placeholder='Create a post' value={text} onChange={onChange}></textarea>
                <input type='submit' value='submit' className='btn btn-dark my-1' />
            </form>
        </div>
    );
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
