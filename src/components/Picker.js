import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Picker extends Component {
  render() {
    const { value, onChange, options } = this.props

    return (
      <span>
        <h1>{value}</h1>
        <select onChange={e => onChange(e.target.value)} value={value}>
          {options.map(option => (
            <option value={option.value} key={option.value}>
              {option.displayName}
            </option>
          ))}
        </select>
      </span>
    )
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
