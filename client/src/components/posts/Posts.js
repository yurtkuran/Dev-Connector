import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

// bring in components
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

// bring in redux
import { connect } from 'react-redux';

// bring in actions
import { getPosts } from '../../actions/postActions';

const Posts = ({ getPosts, post: { posts, loading } }) => {
    // load profile when component loads
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className='large text-primary'>Posts</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Welcome to the community
            </p>
            <PostForm />
            <div className='posts'>{posts.length > 0 ? posts.map((post) => <PostItem key={post._id} post={post} />) : <h4>No posts found...</h4>}</div>
        </Fragment>
    );
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
    post: state.post,
});

export default connect(mapStatetoProps, { getPosts })(Posts);
