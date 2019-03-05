import React from 'react';
import { Link } from "react-router-dom";
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeAction';
import ReactList from 'react-list';

class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);

  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
    HomeActions.getList();
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }	

  sendGood(ID){
    HomeActions.sendGoodPoint(ID);
  }

  renderItem(index, key) {
  	//console.log(this.state);
  	let background = "linear-gradient(#ddd, #ccc)";
  	//console.log( index%2 );
  	if( index % 2 ){
  		background = "linear-gradient(#fff, #eee)";
  	}
    return (
    	<div key={key} style = {{"background":background}}>
    		<div className='row'>
      		<div className='col-sm-10'> 
      			<span style = {{"fontSize":"20","fontWeight":"bold" , "marginLeft" : "20px"}}>{this.state.dataList[index].Title}</span>
      		</div>
      		<div className='col-sm-2'> 
      			<span style = {{"fontSize":"20"}}>{"讚數:"+this.state.dataList[index].GoodPoint}</span>
        	  <Link to="" onClick = {this.sendGood.bind(this,this.state.dataList[index].Id , )} >
              <span className="glyphicon glyphicon-heart"></span>
            </Link>
          </div>
        	</div>
    		<div>{this.state.dataList[index].Text.split('\n').map( (it, i) => 
          <div key={'x'+i}><span style = {{"marginLeft" : "10px"}}>{it}</span></div> )}</div>
    	</div>
    );
  }

  render() {
  	if(this.state.dataList.length>0){
  		//this.props.history.push('/createPage')
  	}
    return (
      <div>
      	<div style={{"background":"	#99BBFF	"}}>
      		<div className='row'>
      		<div className='col-sm-10'> 
      			<span style={{"fontSize":"20px" , "color":"#58666f" , "marginLeft" : "20px"}}>文章列表</span>
      		</div>
      		<div className='col-sm-2'> 
      			<Link to="New" style={{"fontSize":"20px" , "alignSelf": 'flex-end' }}>新增文章</Link>
        	</div>
        	</div>
        </div>
        <ReactList
            itemRenderer={this.renderItem.bind(this)}
            length={this.state.dataList.length}
            type='uniform'
          />
      </div>
    );
  }
}

export default Home;