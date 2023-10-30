import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { normalizeWhitespace } from '../utils/utils'
import './NewTaskForm.css'

export const NewTaskForm = ({ addNewItem }) => {
  const [description, setDescription] = useState('')
  const [minValue, setMinValue] = useState('')
  const [secValue, setSecValue] = useState('')

  const handleDescriptionChange = (event) => {
    const { name, value } = event.target
    if (name === 'description') {
      setDescription(value)
    }
  }

  const handleMinValueChange = (event) => {
    const { name, value } = event.target
    if (name === 'minValue') {
      setMinValue(value)
    }
  }

  const handleSecValueChange = (event) => {
    const { name, value } = event.target
    if (name === 'secValue') {
      setSecValue(value)
    }
  }

  const handleSubmitForm = (event) => {
    if (event.key === 'Enter' && description !== '') {
      const trimDescription = normalizeWhitespace(description)
      addNewItem(trimDescription, minValue, secValue)
      setDescription('')
      setMinValue('')
      setSecValue('')
    }
  }

  return (
    <form className="new-todo-form" onKeyPress={handleSubmitForm}>
      <input
        className="new-todo"
        name="description"
        placeholder="What needs to be done?"
        onChange={handleDescriptionChange}
        value={description}
      />
      <input
        className="new-todo-form__timer"
        name="minValue"
        placeholder="Min"
        onChange={handleMinValueChange}
        value={minValue}
      />
      <input
        className="new-todo-form__timer"
        name="secValue"
        placeholder="Sec"
        onChange={handleSecValueChange}
        value={secValue}
      />
    </form>
  )
}

NewTaskForm.propTypes = {
  addNewItem: PropTypes.func.isRequired,
}

export default NewTaskForm
