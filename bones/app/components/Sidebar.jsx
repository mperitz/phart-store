import React from 'react';
import {Link, browserHistory} from 'react-router';



export default class Sidebar extends React.Component{

  constructor(props){
    super(props);
    this.state = {
    }
    this.onGenreCLickHandler = this.onGenreCLickHandler.bind(this)
    this.onBandCLickHandler = this.onBandCLickHandler.bind(this)
  }

  onGenreCLickHandler(event){
    const genreId = event // this is genre id
    this.props.addGenre(genreId)
    browserHistory.push('/')
  }

  onBandCLickHandler(event){
    const bandId = event // this is genre id
    this.props.addBand(bandId)
    browserHistory.push('/')
  }

  render(){

      let genresArr = this.props.genres
      let bandsArr = this.props.bands

      return (
        <sidebar>
          <div>
            <Link to={'/'}><h2>phART.com</h2></Link>
          </div>
           <h3 className="menu-item">Genres</h3>
          <section>
          {genresArr && genresArr.map(genre => (
            <h4 className="menu-item btn btn-primary btn-block" key={genre.id} value={genre.id} onClick={() => this.onGenreCLickHandler(genre.id)}>
            {genre.name}
            </h4>
          ))
          }
          </section>


          <h3 className="menu-item">Bands</h3>
          <section>
          {bandsArr && bandsArr.map(band => (
            <h4 className="menu-item btn btn-primary btn-block" key={band.id} value={band.id} onClick={() => this.onBandCLickHandler(band.id)}>
            {band.name}
            </h4>
          ))
          }
          </section>
        </sidebar>
      );
    }
  }
