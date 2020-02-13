import React from 'react';
import PropTypes from 'prop-types';

const WorkoutItem = ({ workout }) => {
  const { id, description, type, date } = workout;
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {description}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (type === 'Strength' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {date && (
          <li>
            <i className='fas fa-calender-day'> {date}</i>
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm'>Edit</button>
        <button className='btn btn-danger btn-sm'>Delete</button>
      </p>
    </div>
  );
};

WorkoutItem.propTypes = {
  workout: PropTypes.object.isRequired,
};

export default WorkoutItem;
