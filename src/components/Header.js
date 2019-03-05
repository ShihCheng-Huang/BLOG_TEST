import React from 'react';
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div style ={{"background":"#66FFFF" , "paddingLeft" : "10px"}}>
      	<div style = {{"textAlign":"center"}}> 
      	<span style = {{"fontSize":"24px" , "fontWeight":"bold"}}>
      		BLOG
      	</span>
      	</div>
      	
      	<Link to="home">首頁</Link>
      </div>
    );
  }
}

export default Home;