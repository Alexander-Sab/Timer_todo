import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { normalizeWhitespace } from '../utils/utils'
import './NewTaskForm.css'

export const NewTaskForm = ({ addNewItem }) => {
  const [description, setDescription] = useState('')
  const [minValue, setMinValue] = useState('')
  const [secValue, setSecValue] = useState('')

  const onDescriptionChange = (event) => {
    const { name, value } = event.target
    if (name === 'description') {
      setDescription(value)
    } else if (name === 'minValue') {
      setMinValue(value)
    } else if (name === 'secValue') {
      setSecValue(value)
    }
  }

  const onSubmitForm = (event) => {
    if (event.key === 'Enter' && description !== '') {
      const trimDescription = normalizeWhitespace(description)
      addNewItem(trimDescription, minValue, secValue)
      setDescription('')
      setMinValue('')
      setSecValue('')
    }
  }

  return (
    <form className="new-todo-form" onKeyPress={onSubmitForm}>
      <input
        className="new-todo"
        name="description"
        placeholder="What needs to be done?"
        onChange={onDescriptionChange}
        value={description}
      />
      <input
        className="new-todo-form__timer"
        name="minValue"
        placeholder="Min"
        onChange={onDescriptionChange}
        value={minValue}
      />
      <input
        className="new-todo-form__timer"
        name="secValue"
        placeholder="Sec"
        onChange={onDescriptionChange}
        value={secValue}
      />
    </form>
  )
}

NewTaskForm.propTypes = {
  addNewItem: PropTypes.func.isRequired,
}

export default NewTaskForm
