import React, {Component} from 'react';

import SidebarContainer from '../containers/SidebarContainer.jsx'
import NavbarContainer from '../containers/NavbarContainer'

export default function ({ children }) {
  return (
    <div id="main" className="container-fluid">
      <div className="col-xs-2">
        <SidebarContainer />
      </div>
      <div className="col-xs-10">
        <NavbarContainer />
        { children }
      </div>

    </div>
  )
}


   // <div id="main" className="container-fluid">
   //    <div className="col-xs-2">
   //
   //    </div>
   //    <div className="col-xs-10">
   //      { children }
   //    </div>
   //    <NavbarContainer />
   //  </div>
