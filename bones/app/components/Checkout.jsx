import React from 'react'
import { browserHistory } from 'react-router'

export default class Checkout extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      street: '',
      city: '',
      state: '',
      zip: '',
    }
    this.onSumbitHandler = this.onSumbitHandler.bind(this)
    this.onStreetChange = this.onStreetChange.bind(this)
    this.onCityChange = this.onCityChange.bind(this)
    this.onStateChange = this.onStateChange.bind(this)
    this.onZipChange = this.onZipChange.bind(this)
  }
  onSumbitHandler(event){
    event.preventDefault()
    this.props.submitCheckout(this.props.cart[0].order_id, this.state)
    alert('Your purchase is complete!')
    browserHistory.push('/')
  }
  onStreetChange(event) {
    this.setState({ street: event.target.value })
  }
  onCityChange(event) {
    this.setState({ city: event.target.value })
  }
  onStateChange(event) {
    this.setState({ state: event.target.value })
  }
  onZipChange(event) {
    this.setState({ zip: event.target.value })
  }

  render() {
    return (
    <div>
      <h1>Checkout</h1>
      <form className="mui-form" onSubmit={this.onSumbitHandler}>
        <div className="mui-textfield">
          <ul>
            <li>Shipping Address</li><input name="street" type="text" placeholder="ex. 555 Gordon Lane" onChange={this.onStreetChange} />
            <li>City</li><input type="text" name="city" placeholder="Jamville" onChange={this.onCityChange} />
            <li>State</li><input type="text" name="state" placeholder="TN" onChange={this.onStateChange} />
            <li>Zip</li><input type="text" name="zip" placeholder="01337" onChange={this.onZipChange} />
            <li>Credit Card</li><input type="password" placeholder="xxxx-xxxx-xxxx-xxxx" />
            <li>Exp Date</li><input type="text" placeholder="MM/YY" />
            <li>Security Code</li><input type="text" placeholder="ex. 555" />
          </ul>
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  )
  }
}
