import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { normalizeWhitespace } from '../utils/utils'
import './ChangeTaskForm.css'

const ChangeTaskForm = ({ description, id, onChangeDescription }) => {
  const [newDescription, setNewDescription] = useState('')

  const onDescriptionChange = (event) => {
    setNewDescription(normalizeWhitespace(event.target.value))
  }

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      const updatedDescription = newDescription || description
      onChangeDescription(id, updatedDescription)
    }
  }

  return (
    <input
      type="text"
      className="edit"
      placeholder={description}
      value={newDescription}
      onChange={onDescriptionChange}
      onKeyPress={onKeyPress}
    />
  )
}

ChangeTaskForm.defaultProps = {
  description: '',
  onChangeDescription: () => {},
}

ChangeTaskForm.propTypes = {
  description: PropTypes.string,
  id: PropTypes.number.isRequired,
  onChangeDescription: PropTypes.func,
}

export default ChangeTaskForm
