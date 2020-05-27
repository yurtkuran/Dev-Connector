import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

// bring in redux
import { connect } from 'react-redux';

// bring in actions
import { deletePost, addLike, removeLike } from '../../actions/postActions';

const PostItem = ({ deletePost, addLike, removeLike, auth, post: { _id, name, text, avatar, user, likes, comments, date } }) => {
    return (
        <div className='post bg-white my-1 p-1'>
            <div>
                <Link to={`/profile/${user}`}>
                    <img className='round-img' src={avatar} alt='' />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className='my-1'>{text}</p>
                <p className='post-date'>
                    Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
                </p>
                <button className='btn btn-light' onClick={() => addLike(_id)}>
                    <i className='fas fa-thumbs-up'></i>
                    {likes.length > 0 && <span> {likes.length}</span>}
                </button>
                <button className='btn btn-light' onClick={() => removeLike(_id)}>
                    <i className='fas fa-thumbs-down'></i>
                </button>
                <Link to={`/post/${_id}`} className='btn btn-primary'>
                    Discussion {comments.length > 0 && <span className='comment-count'>{comments.length}</span>}
                </Link>
                {!auth.loading && user === auth.user._id && (
                    <button className='btn btn-danger' onClick={() => deletePost(_id)}>
                        <i className='fas fa-times' />
                    </button>
                )}
            </div>
        </div>
    );
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStatetoProps, { deletePost, addLike, removeLike })(PostItem);
