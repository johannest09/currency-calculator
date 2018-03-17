
import React, { Component } from 'react'
import CurrencyItem from './CurrencyItem'
//import { loading } from 'loading'

export default class CurrencyList extends Component {

  static defaultProps = {
    currencies: []
  }

  componentDidMount() {
    console.log("currencies")
    console.log(this.props.currencies)
  }

  render () {

    return (
      //{ loading ? 'loading...': ''}

      <table className="table table-striped">
        <thead className="thead-landsbanki-brand-color">
          <tr>
            <th>Gjaldmiðill</th>
            <th>Kaup</th>
            <th>Sala</th>
            <th>Upphæð</th>
          </tr>
        </thead>
        <tbody>
          {
            // this.props.currencies.map((currency) => (
            //   <CurrencyItem {...currency} />
            // ))
          }
        </tbody>
      </table>
    )
  }
}
