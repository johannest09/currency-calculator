import React, { Component } from 'react'
import CurrencyList from './components/CurrencyList'

class App extends Component {

  constructor(props){
    super(props)
  }

  static defaultProps = {
    baseValue: 10000,
    calculatedAmounts: []
  }


  componentWillMount() {
  }

  render(){

  }
}

export default App
