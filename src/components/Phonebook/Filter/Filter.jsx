import React from 'react';
import PropTypes from 'prop-types';

export default function Filter({ value, onChange }) {
  return (
    <>
      <label>
        <p
          style={{
           textAlign: 'center'
          }}
        >
          Find contact by name
        </p>
        <input
          type="text"
          placeholder="Enter name..."
          name="filter"
          value={value}
          onChange={onChange}
          style={{
            display: 'block',
            margin: '0 auto',
          }}
        />
      </label>
    </>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
