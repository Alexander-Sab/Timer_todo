import { Component } from 'react'
import PropTypes from 'prop-types'
import './Task.css'

const SECOND_IN_MILLISECOND = 1000

export class Task extends Component {
  state = {
    min: this.props.minValue,
    sec: this.props.secValue,
    isCounting: false,
    startTime: null,
  }

  static defaultProps = {
    description: null,
    checked: false,
    timeAfterCreate: () => {},
    onEditClick: () => {},
    onDeletedClick: () => {},
    onCheckBoxClick: () => {},
  }

  static propTypes = {
    checked: PropTypes.bool,
    onCheckBoxClick: PropTypes.func,
    description: PropTypes.string,
    timeAfterCreate: PropTypes.string,
    onEditClick: PropTypes.func,
    onDeletedClick: PropTypes.func,
  }

  componentWillUnmount() {
    clearInterval(this.counterID)
  }

  minDecrement = () => {
    const { min } = this.state
    this.setState({
      min: min - 1,
      sec: 59,
    })
  }

  secDecrement = () => {
    const { min, sec, isCounting, startTime } = this.state
    const { onCheckBoxClick } = this.props

    if (min === 0 && sec === 0 && isCounting === true) {
      onCheckBoxClick()
      clearInterval(this.counterID)
      this.setState({
        isCounting: false,
      })
    }
    if (sec > 0) {
      this.setState({
        sec: sec - 1,
        isCounting: true,
      })
    } else {
      this.minDecrement()
    }

    if (startTime) {
      const currentTime = new Date()
      const timeDifference = Math.floor(
        (currentTime - startTime) / SECOND_IN_MILLISECOND,
      )
      return timeDifference
    }
  }

  handlePause = (event) => {
    event.stopPropagation()
    this.setState({ isCounting: false })
    clearInterval(this.counterID)
  }

  handleStart = (event) => {
    event.stopPropagation()
    this.setState({ isCounting: true, startTime: new Date() })
    this.counterID = setInterval(() => {
      this.secDecrement()
    }, SECOND_IN_MILLISECOND)
  }

  formatTime = (time) => {
    return time < 10 ? `0${time}` : time
  }

  render() {
    const {
      onCheckBoxClick,
      description,
      timeAfterCreate,
      onEditClick,
      onDeletedClick,
      checked,
    } = this.props
    const { min, sec, isCounting } = this.state
    const buttonTimer = !isCounting ? (
      <button
        type="button"
        className="icon icon-play"
        onClick={this.handleStart}
      />
    ) : (
      <button
        type="button"
        className="icon icon-pause"
        onClick={this.handlePause}
      />
    )
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
          {checked ? null : (
            <span className="description">
              {buttonTimer}
              <span className="description__time-value">
                {this.formatTime(min)}:{this.formatTime(sec)}
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
}
