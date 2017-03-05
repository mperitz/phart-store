import React from 'react';
import {Link} from 'react-router';



export default class Sidebar extends React.Component{

  constructor(props){
    super(props);
    this.state = {
    }
    this.onCLickHandler = this.onCLickHandler.bind(this)
  }

  onCLickHandler(event){
    const genreId = event // this is genre id
    this.props.addGenre(genreId)
  }
  // const playlists = props.playlists;
  render(){

      let genresArr = this.props.genres

      return (
        <sidebar>
          <div>
            <Link to={'/'}><h2>phART.com</h2></Link>
          </div>
          <section>
          {genresArr && genresArr.map(genre => (
            <h4 className="menu-item btn btn-primary btn-block" key={genre.id} value={genre.id} onClick={() => this.onCLickHandler(genre.id)}>
            {genre.name}
            </h4>
          ))
          }
          </section>
          <section>
            <h4 className="menu-item">
              <Link to='/artists'>ARTISTS</Link>
            </h4>
          </section>
          <section>
            <h4 className="menu-item">
              <Link to='/lyrics'>LYRICS</Link>
            </h4>
          </section>
          <section>
            <h4 className="menu-item">
              <Link to='/stations'>STATIONS</Link>
            </h4>
          </section>
          <hr />
          <section>
            <h4 className="text-muted">PLAYLISTS</h4>
            <h4>
              <Link className="btn btn-primary btn-block" to="/new-playlist">
                <span className="glyphicon glyphicon-plus"></span> PLAYLIST
              </Link>
            </h4>
          </section>
          <hr />
          <ul className="list-unstyled">
            {
              // playlists.map(playlist => {
              //   return (
              //     <li key={playlist.id} className="playlist-item menu-item">
              //       <Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
              //     </li>
              //   );
              // })
            }
          </ul>
        </sidebar>
      );
    }
  }
