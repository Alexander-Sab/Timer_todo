import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './TaskFilter.css'

export const TaskFilter = ({ setFilterData }) => {
  const [allButtonClicked, setAllButtonClicked] = useState(true)
  const [activeButtonClicked, setActiveButtonClicked] = useState(false)
  const [completedButtonClicked, setCompletedButtonClicked] = useState(false)

  const handleAllButtonClick = (event) => {
    setAllButtonClicked(true)
    setActiveButtonClicked(false)
    setCompletedButtonClicked(false)
    setFilterData(event)
  }

  const handleActiveButtonClick = (event) => {
    setAllButtonClicked(false)
    setActiveButtonClicked(true)
    setCompletedButtonClicked(false)
    setFilterData(event)
  }

  const handleCompletedButtonClick = (event) => {
    setAllButtonClicked(false)
    setActiveButtonClicked(false)
    setCompletedButtonClicked(true)
    setFilterData(event)
  }

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={allButtonClicked ? 'selected' : ''}
          onClick={handleAllButtonClick}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={activeButtonClicked ? 'selected' : ''}
          onClick={handleActiveButtonClick}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={completedButtonClicked ? 'selected' : ''}
          onClick={handleCompletedButtonClick}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

TaskFilter.propTypes = {
  setFilterData: PropTypes.func.isRequired,
}

export default TaskFilter
