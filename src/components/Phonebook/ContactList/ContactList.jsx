import React from 'react';
import PropTypes from 'prop-types';
import ContactListElement from './ContactListElement';

export default function ContactList({ renderContacts, deleteContacts }) {
  return (
    <ul style={{
      padding: 0}}>
      <ContactListElement
        renderContacts={renderContacts}
        deleteContacts={deleteContacts}
      />
    </ul>
  );
}

ContactList.propTypes = {
  renderContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  deleteContacts: PropTypes.func.isRequired,
};
