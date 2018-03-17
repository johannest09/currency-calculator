import C from './constants'

export function selectBankSlug(bankSlug) {
  return {
    type: C.SELECT_BANKSLUG,
    bankSlug
  }
}

export function selectCurrency(currency) {
  return {
    type: C.SELECT_CURRENCY,
    currency
  }
}

function updateCurrencyValues(bankSlug, currencies, currency) {
  return {
    type: C.UPDATE_CURRENCIES,
    bankSlug,
    currencies,
    currency
  }
}

export function invalidateBankSlug(bankSlug) {
  return {
    type: C.INVALIDATE_BANKSLUG,
    bankSlug
  }
}

function requestCurrencies(bankSlug) {
  return {
    type: C.REQUEST_CURRENCIES,
    bankSlug
  }
}

function handleCurrencyVariants(currencies, defaultCurrency) {

  // m5 is missing askValue and bidValue => replace with value
  currencies = currencies.map(currency => {
    if(currency.askValue === 0) {
      currency.askValue = currency.value
      currency.bidValue = currency.value
    }

    if(currency.changeCur) {
      currency.changeCur = currency.changeCur.toFixed(2)
    }

    return currency
  })

  // Add default currency (ISK) if it does not exist
  if(!currencies.some(currency => C.DEFAULT_CURRENCY_SHORTNAME === currency.shortName)) {
    currencies = [
      defaultCurrency,
      ...currencies
    ]
  }

  return currencies
}

function receiveCurrencies(bankSlug, json, defaultCurrency) {

  var currencies = handleCurrencyVariants(json.results, defaultCurrency)

  return {
    type: C.RECEIVE_CURRENCIES,
    bankSlug,
    currencies: currencies,
    receivedAt: Date.now()
  }
}

function fetchCurrencies(bankSlug) {
  return (dispatch, getState) => {
    dispatch(requestCurrencies(bankSlug))
    let defaultCurrency = getState().selectedCurrency
    return fetch(`https://apis.is/currency/${bankSlug}`)
      .then(response => response.json())
      .then(json => dispatch(receiveCurrencies(bankSlug, json, defaultCurrency)))
  }
}


function shouldFetchCurrencies(state, bankSlug) {
  const currencies = state.currenciesByBankSlug[bankSlug]
  if (!currencies) {
    return true
  } else if (currencies.isFetching) {
    return false
  } else {
    return currencies.didInvalidate
  }
}

export function fetchCurrenciesIfNeeded(bankSlug) {
  return (dispatch, getState) => {
    if (shouldFetchCurrencies(getState(), bankSlug)) {
      return dispatch(fetchCurrencies(bankSlug))
    } else {
      return Promise.resolve()
    }
  }
}

export function updateCurrencies(currency) {
  return (dispatch, getState) => {
    let bankSlug = getState().selectedBankSlug
    const currencies = getState().currenciesByBankSlug[bankSlug]
    return dispatch(updateCurrencyValues(bankSlug, currencies, currency))
  }
}
