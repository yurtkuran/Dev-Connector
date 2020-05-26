import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// bring in components
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

// bring in redux
import { connect } from 'react-redux';

// bring in actions
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';

const Dashboard = ({ getCurrentProfile, profile: { profile, loading }, auth: { user }, deleteAccount }) => {
    // onDelete method
    const onDelete = (id) => {
        deleteAccount();
    };

    // load profile when component loads
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className='large text-primary'>Dashboard</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Welcome {user && user.name}
            </p>
            {profile !== null ? (
                <Fragment>
                    <DashboardActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />
                    <div className='my-2'>
                        <button className='btn btn-danger' onClick={() => onDelete()}>
                            <i className='fas fa-user-minus'></i> Delete My Account
                        </button>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <p> You do not currently had a profile, pleae add some info</p>
                    <Link to='/create-profile' className='btn btn-primary my-1'>
                        Create Profile
                    </Link>
                </Fragment>
            )}
        </Fragment>
    );
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStatetoProps, { getCurrentProfile, deleteAccount })(Dashboard);
