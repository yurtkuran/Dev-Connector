import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// bring in components
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

// bring in redux
import { connect } from 'react-redux';

// bring in actions
import { getPost } from '../../actions/postActions';

const Post = ({ match, getPost, post: { post, loading } }) => {
    // load post when component loads
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match.params.id]);

    return loading || post === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <Link to='/posts' className='btn btn-light'>
                Back to Posts
            </Link>
            <div className='posts'>
                <Fragment>
                    <PostItem post={post} />
                    <CommentForm postID={post._id} />
                    <div className='comments'>
                        {post.comments.length > 0 ? (
                            post.comments.map((comment) => <CommentItem key={comment._id} postID={post._id} comment={comment} />)
                        ) : (
                            <h4>The post does not have any comments...yet</h4>
                        )}
                    </div>
                </Fragment>
            </div>
        </Fragment>
    );
};

Post.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
    post: state.post,
});

export default connect(mapStatetoProps, { getPost })(Post);
