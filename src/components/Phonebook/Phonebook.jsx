import React, { Component } from 'react';
import { Notyf } from 'notyf';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './Phonebook.module.css';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  duration: 1000,
  position: {
    x: 'right',
    y: 'top',
  },
});

const filterContacts = (contacts, filter) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.trim().toLowerCase())
  );
};

export default class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    try {
      const localContacts = JSON.parse(localStorage.getItem('contacts'));
      if (localContacts) {
        this.setState({ contacts: localContacts });
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContactIntoState = newContact => {
    const { contacts } = this.state;

    if (filterContacts(contacts, newContact.name).length) {
      notyf.error(`${newContact.name} is allready in phonebook`);

      return;
    }
    notyf.success(`Contact ${newContact.name} added`);
    this.setState(state => ({
      contacts: [...state.contacts, newContact],
    }));
  };

  deleteContactFromState = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
    notyf.success(`Contact deleted`);
  };

  handleFilterChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = filterContacts(contacts, filter);

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebok</h1>
        <ContactForm addContactIntoState={this.addContactIntoState} />

        <h2 className={styles.title}>Contacts</h2>
        <Filter onChange={this.handleFilterChange} value={filter} />
        <ContactList
          renderContacts={filteredContacts}
          deleteContacts={this.deleteContactFromState}
        />
      </div>
    );
  }
}
