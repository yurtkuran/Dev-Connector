import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

// bring in components
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

// bring in redux
import { connect } from 'react-redux';

// bring in actions
import { getProfiles } from '../../actions/profileActions';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    // load profile when component loads
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <h1 className='large text-primary'>Developers</h1>
                    <p className='lead'>
                        <i className='fab fa-connectdevelop' /> Browse and connect with developers
                    </p>
                    <div className='profiles'>
                        {profiles.length > 0 ? profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} />) : <h4>No profiles found...</h4>}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStatetoProps, { getProfiles })(Profiles);
