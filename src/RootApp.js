import React from "react";
import { renderRoutes } from "react-router-config";
import { BrowserRouter , Link} from "react-router-dom";
import Header from  './components/Header';
const RootApp = (props) => {
  return (
    <div>
    	<Header/>
      	{renderRoutes(props.route.routes)} 
    </div>
  );
};

export default RootApp;

