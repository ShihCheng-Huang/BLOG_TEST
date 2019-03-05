import alt from '../alt';

class CreatePageAction {
  constructor() {
    this.generateActions(
      'createTextSuccess',
      'createTextFail'
    );
  }

  createText(Title1,Text1) {
  	console.log(Title1+":"+Text1);
    $.ajax({
      type: 'POST', 
      url: '/api/create/createText' ,
      data : {
      	Title : Title1 ,
      	Text : Text1
      }
    })
	.done((data) => {
	  this.createTextSuccess(data);	  
	})
	.fail((jqXhr) => {
	  this.createTextFail(jqXhr)
	});
  }
}

export default alt.createActions(CreatePageAction);