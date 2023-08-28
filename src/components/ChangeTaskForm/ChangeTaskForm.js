import { Component } from 'react'
import PropTypes from 'prop-types'

import { normalizeWhitespace } from '../utils/utils'
import './ChangeTaskForm.css'

export class ChangeTaskForm extends Component {
  state = {
    newDescription: '',
  }

  static defaultProps = {
    description: '',
    onChangeDescription: () => {},
  }

  static propTypes = {
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    onChangeDescription: PropTypes.func,
  }

  onDescriptionChange = (event) => {
    this.setState({
      newDescription: normalizeWhitespace(event.target.value),
    })
  }

  onKeyPress = (event) => {
    const { onChangeDescription, id, description } = this.props
    const { newDescription } = this.state
    if (event.key === 'Enter') {
      if (newDescription === '') {
        onChangeDescription(id, description)
      } else {
        onChangeDescription(id, newDescription)
      }
    }
  }

  render() {
    const { description } = this.props
    return (
      <input
        type="text"
        className="edit"
        placeholder={description}
        onChange={this.onDescriptionChange}
        onKeyPress={this.onKeyPress}
      />
    )
  }
}
