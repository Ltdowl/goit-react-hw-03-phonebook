import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css'
import { nanoid } from 'nanoid';

export default class ContactForm extends Component {
  static propTypes = {
    addContactIntoState: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    const { addContactIntoState } = this.props;

    addContactIntoState({
      id: nanoid(),
      name,
      number,
    });

    this.clearInputs();
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  clearInputs = () =>
    this.setState({
      name: '',
      number: '',
    });

  render() {
    const { name, number } = this.state;

    return (
      <form className={styles.form} onSubmit={this.handleFormSubmit}>
        <label htmlFor="name" className={styles.lable}>
          Name
          <input
            type="text"
            placeholder="Enter name..."
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="number" className={styles.lable}>
          Number
          <input
            type="tel"
            placeholder="Enter number..."
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={this.handleChange}
          />
        </label>
        <div>
          <button
            disabled={!name || !number}
            className={styles.button}
            type="submit"
          >
            Add contact
          </button>
        </div>
      </form>
    );
  }
}
