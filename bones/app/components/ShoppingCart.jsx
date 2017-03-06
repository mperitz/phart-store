import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props)
    // Trying to display total price on the shopping cart screen
    this.state = {
      totalPrice: 0
    }
  }
  componentWillUpdate () {
    this.props.cart.forEach(item => {
      this.setState({totalPrice: this.state.totalPrice + item.price})
    })
  }
  render(props) {
    const cartItems = this.props.cart
    let total = 0
    return (
      cartItems ?
      <div>
        <span>Order Total: {(total / 100).toFixed(2)}</span>
        <ol>
          {cartItems.map(item => {
            total += item.price
            return (
              <li key={item.id}>
                <div className="thumbnail cart">
                  <h5>{item.name}</h5>
                  <img src={ item.profile_image } />
                  <h6>${(item.price / 100).toFixed(2)}</h6>
                  <h6>Quantity: {item.quantity}</h6>
                  <button className="btn btn-danger" onClick={() => props.removeItemFromCart(item)}>Remove from Cart</button>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
      :
      <h2>Your cart is empty</h2>
    )
  }
}
