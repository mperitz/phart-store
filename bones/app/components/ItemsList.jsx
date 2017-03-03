import React from 'react';
import {Link} from 'react-router';

export default function ItemsList (props) {
  const items = props.items

  return (
    <div>
      <h3>Items</h3>
      <div className="row">
        {
          items && items.map(item => (
            <div className="col-xs-4" key={ item.id }>
              <Link className="thumbnail" to={`/items/${item.id}`}>
                <img src={ item.profile_image } />
                <div className="caption">
                  <h5>
                    <span>{ item.name }</span>
                  </h5>
                  <h5>
                    <span>Description</span>
                  </h5>
                  <small>{ item.description } </small>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
}
