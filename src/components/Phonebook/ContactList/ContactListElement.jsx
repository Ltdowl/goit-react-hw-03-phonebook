import React from 'react';
import PropTypes from 'prop-types';

export default function ContactListElement({ renderContacts, deleteContacts }) {
  return (
    <>
      {renderContacts.map(contact => (
        <li key={contact.id} style={{
          listStyleType: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          border: '1px dotted black'
        }}>
          <span>{`${contact.name}: ${contact.number}`}</span>
          <button
            type="button"
            style={{ marginLeft: '5px',
              cursor: 'pointer'
            }}
            onClick={() => deleteContacts(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </>
  );
}

ContactListElement.propTypes = {
  renderContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  deleteContacts: PropTypes.func.isRequired,
};
