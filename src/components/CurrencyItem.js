
import React, { Component } from 'react'
import C from '../constants'
//import PropTypes from 'prop-types'

class CurrencyItem extends Component {

  static defaultProps = {
    currency: null
  }

  render(){
    const { currency } = this.props
    return (
      <tr>
        <td><div className={`currency-flag currency-flag-${ currency.shortName.toLowerCase() }`}></div>{currency.shortName}</td>
        <td>{currency.askValue}</td>
        <td>{currency.bidValue}</td>
        <td>
          <input
            type="number"
            value={() => {
              this.props.calculateCurrencyItemAmount(currency.askValue)
            }}
            ref={ node => { this.input = node }}
            onChange={() => console.log("lksadf") }
          />
          </td>
      </tr>
    )
  }

}

export default CurrencyItem

/*
CurrencyItem.propTypes = {
  currency: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired
}
*/
