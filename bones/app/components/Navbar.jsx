import React from 'react';
import {Link} from 'react-router';

export default function (props) {

  console.log(props)

  return (
    <div>
      	<div id="navbar">
            <div className="container">
                <div className="row">
                    <div className="flipkart-navbar-search smallsearch col-sm-8 col-xs-11">
                        <div className="row">
                            <input className="flipkart-navbar-input col-xs-11" type="text" placeholder="Search for your favorite artist, band, or genre" name="">
                            </input>
                            <button id="input-button" className="col-xs-1 btn btn-warning">Search</button>
                        </div>
                    </div>
                    <div id="cart" className="nav-right col-sm-1">
                        <Link to={`/cart/${(props.auth ? props.auth.id : 0)}`}><button className="btn btn-primary">
                            <svg className="cart-svg" width="16 " height="16 " viewBox="0 0 16 16 ">
                                <path d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86 " fill="#fff "></path>
                            </svg> Cart </button>
                        </Link>
                    </div>
                    <div className="nav-right col-sm-1">
                        {props.auth ? null : <div id="mySidenav" className="sidenav">
                          <Link to={'/login'} >
                            <button className="btn btn-info">Login</button>
                          </Link>
                        </div>}
                    </div>
                    <div className="nav-right col-sm-1">
                        {props.auth ? null : <div id="mySidenav" className="sidenav">
                            <Link to={'/signup'} >
                              <button className="btn btn-info">Sign Up</button>
                            </Link>
                        </div>}
                    </div>
                    <div className="nav-right col-sm-1">
                        {props.auth ? <div id="mySidenav" className="sidenav">
                            <Link to={'/'} >
                              <button className="btn btn-info" onClick={props.logout}>Logout</button>
                            </Link>
                        </div> : null}
                    </div>
                    <div className="nav-right col-sm-1">
                        {props.auth ? <div id="mySidenav" className="sidenav">
                            <Link to={`/users/${props.auth.id}/orderHistory`} >
                              <button className="btn btn-info" onClick={() => props.fetchOrders(props.auth.id)}>Order History</button>
                            </Link>
                        </div> : null}
                    </div>
                    {/*<div id="mySidenav" className="sidenav">
                      <div className="container">
                        <Link to={'/'} >
                          <span className="sidenav-heading">Home</span>
                        </Link>
                      </div>
                  </div>*/}
                </div>
            </div>
        </div>
    </div>
  	)

}
