
const dataService = store => next => action => {
  /*
  Pass all actions through by default
  */
  next(action)
    switch (action.type) {
      case 'GET_CURRENCY_DATA':
        /*
        In case we receive an action to send an API request, send the appropriate request
        */
        fetch('https://apis.is/currency/lb')
        .then((err, res) => {
          if (err) {
            /*
            in case there is any error, dispatch an action containing the error
            */
            return next({
              type: 'GET_CURRENCY_DATA_ERROR',
              err
            })
          }
          const data = JSON.parse(res.text)
          /*
          Once data is received, dispatch an action telling the application
          that data was received successfully, along with the parsed data
          */
          next({
            type: 'GET_CURRENCY_DATA_RECEIVED',
            data
          })
        })
        break
      /*
      Do nothing if the action does not interest us
      */
      default:
        break
    }
}

export default dataService


/*

getCurrencies = () => {
  const url = 'https://apis.is/currency/lb'
  fetch(url)
  .then(response => response.json())
  .then((currencies) => {
      this.setState({
        currencies: [
          ...this.state.currencies,
          ...currencies["results"]
        ]
      })
  })
}
*/
