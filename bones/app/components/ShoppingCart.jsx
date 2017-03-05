import React from 'react'

export default function Cart (props) {
  console.log(props)
  const cartItems = props.cart

  return (
    cartItems ? <ol>
      {cartItems.map(item => {
        return (
          <li key={item.id}>
            <div className="thumbnail cart">
              <h5>{item.name}</h5>
              <img src={ item.profile_image } />
              <h6>${(item.price/100).toFixed(2)}</h6>
              <h6>Quantity: {item.quantity}</h6>
              <button className="btn btn-danger">Remove from Cart</button>
            </div>
          </li>
        )
      })}
    </ol>
    :
    <h2>Your cart is empty</h2>
  )
}
