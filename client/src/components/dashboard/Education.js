import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

// bring in redux
import { connect } from 'react-redux';

// bring in actions
import { deleteEducation } from '../../actions/profileActions';

const Education = ({ education, deleteEducation }) => {
    const onDelete = (id) => {
        console.log(`delete education ${id}`);
        deleteEducation(id);
    };

    const educations = education.map((edu) => (
        <tr key={edu._id}>
            <td> {edu.school}</td>
            <td className='hide-sm'>{edu.degree}</td>
            <td className='hide-sm'>
                {' '}
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {edu.to === null ? ' now' : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}{' '}
            </td>
            <td>
                <button className='btn btn-danger' onClick={() => onDelete(edu._id)}>
                    <i className='far fa-trash-alt'></i>
                </button>
            </td>
        </tr>
    ));

    if (education.length > 0) {
        return (
            <Fragment>
                <h2 className='my-2'>Education</h2>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>School</th>
                            <th className='hide-sm'>Degree</th>
                            <th className='hide-sm'>Years</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>{educations}</tbody>
                </table>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <p className='my-2'>Please enter education details.</p>
            </Fragment>
        );
    }
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
