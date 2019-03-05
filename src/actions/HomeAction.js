import alt from '../alt';

class HomeAction {
  constructor() {
    this.generateActions(
      'getHomeListSuccess',
      'getHomeListFail'
    );
  }

  getList() {
    $.ajax({ 
      url: '/api/home/getList' ,
      type: 'POST', 
    })
    .done((data) => {
      this.getHomeListSuccess(data)
    })
    .fail((jqXhr) => {
      this.getHomeListFail(jqXhr)
    });
  }

  sendGoodPoint(ID){
    $.ajax({ 
      url: '/api/home/sendGoodPoint' ,
      type: 'POST',
      data : {
        ID : ID
      } 
    })
    .done((data) => {
      this.getList();
    })
    .fail((jqXhr) => {
      this.getHomeListFail(jqXhr)
    });
  }
}

export default alt.createActions(HomeAction);