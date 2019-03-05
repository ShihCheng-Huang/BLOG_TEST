import alt from '../alt';
import CreatePageAction from '../actions/CreatePageAction';

class CreatePageStore {
  constructor() {
    this.bindActions(CreatePageAction);
    this.Title = "";
    this.Text = "";
    this.message = "";
  }

  createTextSuccess(data) {
    console.log(this)
    this.message = data ;
  }

  createTextFail(jqXhr) {
    // Handle multiple response formats, fallback to HTTP status code number.
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(CreatePageStore);