import React from 'react';
import Comments from './Comments'

export default function Item (props) {

  const selected = props.selected
  const comments = props.comments

  return (
    <div className="album">
      <div>
        <h3>{ selected.name }</h3>
        <img src={ selected.profile_image } className="img-thumbnail"/>
      </div>
        <Comments allComments={comments} />
    </div>
  );
}
