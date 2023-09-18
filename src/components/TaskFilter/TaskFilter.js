import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './TaskFilter.css'

const TaskFilter = ({ setFilterData }) => {
  const [allButtonClicked, setAllButtonClicked] = useState(true)
  const [activeButtonClicked, setActiveButtonClicked] = useState(false)
  const [completedButtonClicked, setCompletedButtonClicked] = useState(false)

  const onClickButton = (event) => {
    const buttonClicked = event.target.innerText.toLowerCase()
    if (buttonClicked === 'all') {
      setAllButtonClicked(true)
      setActiveButtonClicked(false)
      setCompletedButtonClicked(false)
    } else if (buttonClicked === 'active') {
      setAllButtonClicked(false)
      setActiveButtonClicked(true)
      setCompletedButtonClicked(false)
    } else {
      setAllButtonClicked(false)
      setActiveButtonClicked(false)
      setCompletedButtonClicked(true)
    }
    setFilterData(event)
  }

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={allButtonClicked ? 'selected' : ''}
          onClick={onClickButton}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={activeButtonClicked ? 'selected' : ''}
          onClick={onClickButton}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={completedButtonClicked ? 'selected' : ''}
          onClick={onClickButton}
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
