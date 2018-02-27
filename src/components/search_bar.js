import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {term: ''};
  }

  render() {  // Needed for every class component
    return (
      <div className="search-bar">
        <input 
          value={this.state.term} // makes input a controlled component, value changes only on state change
          onChange={event => this.onInputChange(event.target.value)} />
      </div>
      );
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }

}

export default SearchBar;