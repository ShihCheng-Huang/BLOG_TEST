import React from 'react';
import { BrowserRouter } from "react-router-dom";
import PrimaryLayout from '../routes.js';

class App extends React.Component {
	render() {
    	return (
			<BrowserRouter>
    			<PrimaryLayout />
  			</BrowserRouter>
    	);
  	}
}

export default App;