import React from 'react';
import {Link} from 'react-router';

export default function (props) {

  // const playlists = props.playlists;

  return (
    <div>
      	<div id="navbar">
            <div className="container">
                <div className="row row1">
                </div>
                <div className="row row2">
                    <div className="col-sm-2">
                        <h2><span className="smallnav menu">phART.com</span></h2>
                    </div>
                    <div className="flipkart-navbar-search smallsearch col-sm-8 col-xs-11">
                        <div className="row">
                            <input className="flipkart-navbar-input col-xs-11" type="text" placeholder="Search for your favorite artist, band, or genre" name="">
                            </input>
                            <button className="flipkart-navbar-button col-xs-1">
                                <svg width="15px" height="15px">
                                    <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>

                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="cart largenav col-sm-2">
                        <Link to="/cart">
                            <svg className="cart-svg" width="16 " height="16 " viewBox="0 0 16 16 ">
                                <path d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86 " fill="#fff "></path>
                            </svg> Cart
                        </Link>
                    </div>

                </div>
            </div>
        </div>

        <div id="mySidenav" className="sidenav">
            <div className="container">
              <Link to={'/'} >
                <span className="sidenav-heading">Home</span>
              </Link>
            </div>
        </div>
        {props.auth ? null : <div id="mySidenav" className="sidenav">
            <div className="container">
              <Link to={'/login'} >
                <span className="sidenav-heading">Login</span>
              </Link>
            </div>
        </div>}
        {props.auth ? null : <div id="mySidenav" className="sidenav">
            <div className="container">
              <Link to={'/signup'} >
                <span className="sidenav-heading">Sign Up</span>
              </Link>
            </div>
        </div>}
        {props.auth ? <div id="mySidenav" className="sidenav">
            <div className="container">
              <Link to={'/'} >
                <span className="sidenav-heading" onClick={props.logout}>Logout</span>
              </Link>
            </div>
        </div> : null}
    </div>
  	)

}
