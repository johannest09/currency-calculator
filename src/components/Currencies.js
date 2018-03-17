import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Currencies extends Component {

  // constructor(props) {
  //   super(props)
  //   this.handleChange = this.handleChange.bind(this)
  // }

  // We need to update all inputs except the one we are typing in
  // handleChange(input) {
  //   this.props.dispatch(calculateCurrencyAmounts(input)
  // }

  render() {

    const { currencies, onChange } = this.props

    // function sortNames(a,b) {
    //   if (a.shortName < b.shortName)
    //     return -1;
    //   if (a.shortName > b.shortName)
    //     return 1;
    //   return 0;
    // }

    return (
      <table>
        <thead>
          <tr>
            <th>Gjaldmiðill</th>
            <th>Kaup</th>
            <th>Sala</th>
            <th>Breyting</th>
            <th>Upphæð</th>
          </tr>
        </thead>
        <tbody>
          {
            currencies.map((currency, i) =>
              <tr key={i} >
                <td>{currency.shortName}</td>
                <td>{currency.askValue}</td>
                <td>{currency.bidValue}</td>
                <td>{currency.changeCur}</td>
                  <td><input type="text" value={currency.value} onChange={e => onChange({
                    ...currency,
                    value: e.target.value
                  })} /></td>
              </tr>
            )
          }
        </tbody>
      </table>
    )
  }
}

Currencies.propTypes = {
  currencies: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}
