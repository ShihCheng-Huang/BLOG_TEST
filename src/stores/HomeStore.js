import alt from '../alt';
import HomeAction from '../actions/HomeAction';

class HomeStore {
  constructor() {
    this.bindActions(HomeAction);
    this.dataList = [];
  }

  getHomeListSuccess(data) {
    this.dataList = data;
  }

  getHomeListFail(jqXhr) {
    // Handle multiple response formats, fallback to HTTP status code number.
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(HomeStore);