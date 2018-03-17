import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectBankSlug,
  selectCurrency,
  updateCurrencies,
  fetchCurrenciesIfNeeded,
  invalidateBankSlug
} from '../actions'
import Picker from '../components/Picker'
import Currencies from '../components/Currencies'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedBankSlug, selectedCurrency } = this.props
    dispatch(fetchCurrenciesIfNeeded(selectedBankSlug)).then(() => {
      dispatch(updateCurrencies(selectedCurrency))
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedBankSlug !== prevProps.selectedBankSlug) {
      const { dispatch, selectedBankSlug } = this.props
      dispatch(fetchCurrenciesIfNeeded(selectedBankSlug))
    }
  }

  handleChange(nextBankSlug) {
    this.props.dispatch(selectBankSlug(nextBankSlug))
    this.props.dispatch(fetchCurrenciesIfNeeded(nextBankSlug)).then(() => {
      this.props.dispatch(updateCurrencies(this.props.selectedCurrency))
    })
  }

  handleInputChange(currency) {
    this.props.dispatch(selectCurrency(currency))
    this.props.dispatch(updateCurrencies(currency))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedBankSlug } = this.props
    dispatch(invalidateBankSlug(selectedBankSlug))
    dispatch(fetchCurrenciesIfNeeded(selectedBankSlug))
  }

  render() {
    const { selectedBankSlug, currencies, isFetching, lastUpdated } = this.props
    return (
      <div>
        <Picker
          value={selectedBankSlug}
          onChange={this.handleChange}
          options={[{displayName: 'Arion', value: 'arion'}, { displayName: 'Landsbankinn', value: 'lb'}, { displayName: 'm5', value: 'm5'}]}
        />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>}
          {!isFetching &&
            <a href="javascript:void(0)" onClick={this.handleRefreshClick}>
              Refresh
            </a>}
        </p>
        {isFetching && currencies.length === 0 && <h2>Loading...</h2>}
        {!isFetching && currencies.length === 0 && <h2>Empty.</h2>}
        {currencies.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Currencies currencies={currencies} onChange={this.handleInputChange} />
          </div>}
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedBankSlug: PropTypes.string.isRequired,
  currencies: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  inputAmount: PropTypes.number
}

function mapStateToProps(state) {
  const { selectedBankSlug, selectedCurrency, currenciesByBankSlug } = state
  const {
    isFetching,
    lastUpdated,
    items: currencies
  } = currenciesByBankSlug[selectedBankSlug] || {
    isFetching: true,
    items: []
  }

  return {
    selectedBankSlug,
    selectedCurrency,
    currencies,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
