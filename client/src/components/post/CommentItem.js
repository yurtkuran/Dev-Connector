import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

// bring in redux
import { connect } from 'react-redux';

// bring in actions
import { removeComment } from '../../actions/postActions';

const CommentItem = ({ postID, removeComment, auth, comment: { _id, name, user, date, avatar, text } }) => {
    return (
        <div className='post bg-white p-1 my-1'>
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
                {!auth.loading && user === auth.user._id && (
                    <button className='btn btn-danger' onClick={() => removeComment(postID, _id)}>
                        <i className='fas fa-times' />
                    </button>
                )}
            </div>
        </div>
    );
};

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    postID: PropTypes.string.isRequired,
    removeComment: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStatetoProps, { removeComment })(CommentItem);
