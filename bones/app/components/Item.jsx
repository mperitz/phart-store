import React from 'react';
// import SongsContainer from '../containers/SongsContainer';

export default function Item (props) {

  const selected = props.selected


  return (
    <div className="album">
      <div>
        <h3>{ selected.name }</h3>
        <img src={ selected.profile_image } className="img-thumbnail"/>
        <p>{ selected.description }</p>
        <h4>Price:  ${ (selected.price / 100).toFixed(2) }</h4>
        <h5>Quantity Available:  { selected.num_available }</h5>
        <button className="btn btn-primary" onClick={() => {
          console.log(selected)
          props.addItemToCart(selected)}} >
          Add to Cart</button>
      </div>
    </div>
  );
}
