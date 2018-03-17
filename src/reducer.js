import C from './constants'
import { combineReducers } from 'redux'


function selectedBankSlug(state = 'arion', action) {
  switch (action.type) {
    case C.SELECT_BANKSLUG:
      return action.bankSlug
    case C.GET_SELECTED_BANKSLUG:
      return state
    default:
      return state
  }
}

function selectedCurrency(state = { shortName: 'ISK', longName: 'Íslensk króna', value: 1000, askValue: 1, bidValue: 1 , changeCur: 0, changePer: "0.00" } , action) {
  switch (action.type) {
    case C.SELECT_CURRENCY:
      return action.currency
    default:
      return state
  }
}

function currencies(
	state = { isFetching: false, didInvalidate: false, items: [] },
	action
) {
	switch (action.type) {
		case C.INVALIDATE_BANKSLUG:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case C.REQUEST_CURRENCIES:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			})
		case C.RECEIVE_CURRENCIES:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
        items: action.currencies,
				lastUpdated: action.receivedAt
			})
    case C.UPDATE_CURRENCIES:
      return Object.assign({}, state, {
        items: state.items.map((currency, index) => {
          if(currency.shortName !== action.currency.shortName) {
            return Object.assign({}, currency, {
              value: Math.round( (action.currency.value * (action.currency.askValue / currency.askValue )) * 100 ) / 100
            })
          } else {
            return Object.assign({}, currency, {
              value: action.currency.value
            })
          }
        })
      })
		default:
			return state
	}
}

function currenciesByBankSlug(state = {}, action) {
  switch (action.type) {
    case C.INVALIDATE_BANKSLUG:
    case C.RECEIVE_CURRENCIES:
    case C.REQUEST_CURRENCIES:
    case C.UPDATE_CURRENCIES:
      return Object.assign({}, state, {
        [action.bankSlug]: currencies(state[action.bankSlug], action)
      })

    default:
      return state
  }
}

const rootReducer = combineReducers({
  currenciesByBankSlug,
  selectedBankSlug,
  selectedCurrency
})

export default rootReducer
