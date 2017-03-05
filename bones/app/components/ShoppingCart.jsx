import React from 'react'

export default function Cart (props) {

  const cartItems = props.list

  return (
    cartItems ? <ol>
      {cartItems.map(item => {
        return (
          <li key={item.id}>
            <div className="thumbnail">
              <h3>{item.name}</h3>
              <img src={ item.profile_image } />
              <h4>{item.price}</h4>
              <h4>{item.quantity}</h4>
            </div>
          </li>
        )
      })}
    </ol>
    :
    <h2>Your cart is empty</h2>
  )
}
