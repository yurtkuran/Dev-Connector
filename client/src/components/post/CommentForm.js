import React, { useState } from 'react';
import PropTypes from 'prop-types';

// bring in redux
import { connect } from 'react-redux';

// bring in actions
import { addComment } from '../../actions/postActions';

const CommentForm = ({ addComment, postID }) => {
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
        addComment(postID, formData);
        setFormData({ text: '' });
    };

    return (
        <div className='post-form'>
            <div className='post-form-header bg-primary'>
                <h3>Leave a comment...</h3>
            </div>
            <form className='form my-1' onSubmit={onSubmit}>
                <textarea name='text' id='' cols='30' rows='5' placeholder='Comment on this post' value={text} onChange={onChange}></textarea>
                <input type='submit' value='submit' className='btn btn-dark my-1' />
            </form>
        </div>
    );
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    postID: PropTypes.string.isRequired,
};

export default connect(null, { addComment })(CommentForm);
