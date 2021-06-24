import React, { Component } from "react";

export default class SearchBar extends Component {
  state = {
    searchTerm: "",
  };

  changeSearchTerm = (evt) => {
    this.setState({
      searchTerm: evt.target.value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();

    // pass the data from here to the parent component, App, using prop-drilling (another method is contextAPI)
    this.props.onSearch(this.state.searchTerm);
  };

  render() {
    // console.log(this.props);
    return (
      <form className="ui form" onSubmit={this.submitForm}>
        <div className="field">
          <label htmlFor="video">Search Video</label>
          <input
            id="video"
            type="text"
            placeholder="search video ..."
            onChange={this.changeSearchTerm}
            value={this.state.searchTerm}
          />
        </div>
      </form>
    );
  }
}
