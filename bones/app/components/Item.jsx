import React from 'react';
// import SongsContainer from '../containers/SongsContainer';

export default function Item (props) {

  const selected = props.selected
  

  return (
    <div className="album">
      <div>
        <h3>{ selected.name }</h3>
        <img src={ selected.profile_image } className="img-thumbnail"/>
      </div>
      {/*<SongsContainer songs={album.songs} />*/}
    </div>
  );
}