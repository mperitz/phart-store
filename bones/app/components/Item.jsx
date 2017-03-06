import React from 'react';
import Comments from './Comments'

export default function Item (props) {

  const selected = props.selected
  const comments = props.comments
  const userId = props.userId
  const addComment = props.addComment

  return (
    <div className="album">
      <div>
        <h3>{ selected.name }</h3>
        <img src={ selected.profile_image } className="img-thumbnail"/>
        <p>{ selected.description }</p>
        <h4>Price:  ${ (selected.price / 100).toFixed(2) }</h4>
        <h5>Quantity Available:  { selected.num_available }</h5>
        <button className="btn btn-primary" onClick={() => {props.addItemToCart(selected, userId)}} >Add to Cart</button>
      </div>
        <Comments allComments={comments} userId={userId} itemId={selected.id} submitHandler={addComment} />

    </div>
  );
}
