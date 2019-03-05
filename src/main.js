import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Link} from "react-router-dom";
import { renderRoutes } from 'react-router-config';
import routes from './routes.js';

ReactDOM.hydrate(		
		<BrowserRouter>
			{renderRoutes(routes)} 
		</BrowserRouter>
	
, document.getElementById('app'));