import React from 'react'
import { Link } from 'react-router'

export default class extends React.Component {
  constructor(props) {
    super(props)
  }
  getTotal() {
    let orderTotal = 0
    this.props.cart.forEach(item => {
      orderTotal += item.price
    })
    return orderTotal
  }
  render() {
    const cartItems = this.props.cart
    return (
      cartItems.length ?
      <div>
        <span>Order Total: {(this.getTotal() / 100).toFixed(2)}</span>
        <ol>
          {cartItems.map(item => {
            return (
              <li key={item.id}>
                <img className="cart-img" src={ item.profile_image } />
                <div className="thumbnail cart">
                  <h5>{item.name}</h5>
                  <h6>${(item.price / 100).toFixed(2)}</h6>
                  <h6>Quantity: {item.quantity}</h6>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                        this.props.removeItemFromCart(item, this.props.user.id)
                      }
                    }>
                    Remove from Cart
                  </button>
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
