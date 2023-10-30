import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Task.css'

export const Task = ({
  onCheckBoxClick,
  description,
  timeAfterCreate,
  onEditClick,
  onDeletedClick,
  checked,
  minValue,
  secValue,
}) => {
  const [min, setMin] = useState(minValue)
  const [sec, setSec] = useState(secValue)
  const [isCounting, setIsCounting] = useState(false)
  const [startTime, setStartTime] = useState(null)

  useEffect(() => {
    setMin(minValue)
    setSec(secValue)
  }, [minValue, secValue])

  useEffect(() => {
    if (isCounting) {
      const timer = setInterval(() => {
        const currentTime = new Date()
        const elapsedTime = Math.floor((currentTime - startTime) / 1000)
        const remainingTime = minValue * 60 + secValue - elapsedTime

        if (remainingTime > 0) {
          const remainingMin = Math.floor(remainingTime / 60)
          const remainingSec = remainingTime % 60

          setMin(remainingMin)
          setSec(remainingSec)
        } else {
          onCheckBoxClick()
          setIsCounting(false)
          clearInterval(timer)
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isCounting, minValue, secValue, startTime, onCheckBoxClick])

  const handlePause = (event) => {
    event.stopPropagation()
    setIsCounting(false)
  }

  const handleStart = (event) => {
    event.stopPropagation()
    setIsCounting(true)
    setStartTime(new Date())
  }

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time
  }

  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        readOnly
        onClick={onCheckBoxClick}
        checked={checked}
      />
      <div className="label">
        <span role="presentation" className="title" onClick={onCheckBoxClick}>
          {description}
        </span>
        {!checked && (
          <span className="description">
            {!isCounting ? (
              <button
                type="button"
                className="icon icon-play"
                onClick={handleStart}
              />
            ) : (
              <button
                type="button"
                className="icon icon-pause"
                onClick={handlePause}
              />
            )}
            <span className="description__time-value">
              {formatTime(min)}:{formatTime(sec)}
            </span>
          </span>
        )}
        <span className="created">created {timeAfterCreate} ago</span>
      </div>
      <button
        type="button"
        className="icon icon-edit"
        onClick={onEditClick}
        aria-label="log out"
      />
      <button
        type="button"
        className="icon icon-destroy"
        onClick={onDeletedClick}
        aria-label="log out"
      />
    </div>
  )
}

Task.propTypes = {
  onCheckBoxClick: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  timeAfterCreate: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeletedClick: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  minValue: PropTypes.number.isRequired,
  secValue: PropTypes.number.isRequired,
}

export default Task
