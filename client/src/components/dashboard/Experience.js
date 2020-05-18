import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

// bring in redux
import { connect } from 'react-redux';

// bring in actions
import { deleteExperience } from '../../actions/profileActions';

const Experience = ({ experience, deleteExperience }) => {
    const onDelete = (id) => {
        deleteExperience(id);
    };

    const experiences = experience.map((exp) => (
        <tr key={exp._id}>
            <td> {exp.company}</td>
            <td className='hide-sm'>{exp.title}</td>
            <td className='hide-sm'>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {exp.to === null ? ' now' : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}{' '}
            </td>
            <td>
                <button className='btn btn-danger' onClick={() => onDelete(exp._id)}>
                    <i className='far fa-trash-alt'></i>
                </button>
            </td>
        </tr>
    ));

    if (experience.length > 0) {
        return (
            <Fragment>
                <h2 className='my-2'>Experience</h2>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th className='hide-sm'>Title</th>
                            <th className='hide-sm'>Years</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>{experiences}</tbody>
                </table>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <p className='my-2'>Please enter experience details.</p>
            </Fragment>
        );
    }
};

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
