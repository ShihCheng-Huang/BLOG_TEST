import React from 'react';
import { Link ,withRouter } from "react-router-dom";
import CreatePageStore from '../stores/CreatePageStore'
import CreatePageAction from '../actions/CreatePageAction';
import ReactList from 'react-list';

class CreatePage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = CreatePageStore.getState();
    this.onChange = this.onChange.bind(this);

  }

  componentDidMount() {
    CreatePageStore.listen(this.onChange);
  }

  componentWillUnmount() {
    CreatePageStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  changeTitle(event){
    this.setState({Title: event.target.value});
  }	

  changeText(event){
    this.setState({Text: event.target.value});
  } 

  send(){
    let Title = this.state.Title ; 
    let Text = this.state.Text ; 
    if( Title == "") {
      alert("標題未填");
    }else if ( Text == "") {
      alert("主文未填");
    }else {
       CreatePageAction.createText(Title,Text);
    }
  }

  render() {
    if(this.state.message == "SUCCESS") {
      this.setState({message:""})
      alert("新增成功")
      this.props.history.push("/");
    }
  	 
    return (
      <div className = "container">
        <div className ="mb-3">
      	<label style = {{fontSize : "20px"}}>標題：</label>
        <input className = "form-control" type="text" value={this.state.Title} onChange={this.changeTitle.bind(this)} />
        <label style = {{fontSize : "20px"}}>主文：</label>
        <textarea  style={{height:"150px"}} className = "form-control" type="text" value={this.state.Text} onChange={this.changeText.bind(this)} >
        </textarea >
        <button onClick = {this.send.bind(this)}className="btn btn-primary btn-lg btn-block" type="submit">送出</button>
        </div>
      </div>
    );
  }
}

export default withRouter(CreatePage);