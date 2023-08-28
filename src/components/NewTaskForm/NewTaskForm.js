import { Component } from 'react'
import PropTypes from 'prop-types'

import { normalizeWhitespace } from '../utils/utils'
import './NewTaskForm.css'

export class NewTaskForm extends Component {
  state = {
    description: '',
    placeholder: 'What needs to be done?',
    minValue: '',
    secValue: '',
  }

  static defaultProps = {
    addNewItem: () => {},
  }

  static propTypes = {
    addNewItem: PropTypes.func,
  }

  onDescriptionChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  onSubmitForm = (event) => {
    const { addNewItem } = this.props
    const { description, minValue, secValue } = this.state

    if (event.key === 'Enter' && description !== '') {
      const trimDescription = normalizeWhitespace(description)
      addNewItem(trimDescription, minValue, secValue)

      this.setState({
        description: '',
        placeholder: 'What needs to be done?',
        minValue: '',
        secValue: '',
      })
    }
  }

  render() {
    const { description, placeholder, minValue, secValue } = this.state

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <form className="new-todo-form" onKeyPress={this.onSubmitForm}>
        <input
          className="new-todo"
          name="description"
          placeholder={placeholder}
          onChange={this.onDescriptionChange}
          value={description}
        />
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <input
          className="new-todo-form__timer"
          name="minValue"
          placeholder="Min"
          onChange={this.onDescriptionChange}
          value={minValue}
        />
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <input
          className="new-todo-form__timer"
          name="secValue"
          placeholder="Sec"
          onChange={this.onDescriptionChange}
          value={secValue}
        />
      </form>
    )
  }
}
