import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class SearchBar extends Component {
  constructor(){
    super();
    //intialize input value
    this.state = {
        searchQuery: ''
    }
  }

  //function to update state with search query
  updateSearchQuery (e) {
    this.setState({
      searchQuery: e.target.value
    })
  }

  //this function handles the search by calling the prop's search function
  performSearch (query) {

    //check if blank?
    if(this.state.searchQuery !== ""){

    //reset the search bar
      this.setState({
        searchQuery: ''
      })
      this.props.searchFunc(query)
    }
  }

  render(){

    //holds JSX for the search button
    const button = (
      <button onClick={() => this.performSearch(this.state.searchQuery)} type="submit" className="search-button">
          <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
      </button>);

    return (
      <form className="search-form">
          {/*text input should call updateSearchQuery on change*/}
          <input value={this.state.searchQuery} type="search" name="search" placeholder="Search" onChange={e => this.updateSearchQuery(e)}/>

          {/*check if query is blank, disable button if so*/}
          {/*button links to the dynamic route*/}
          {this.state.searchQuery !== ""
          ?
            <Link to={`/q=${this.state.searchQuery}`}>
              {button}
            </Link>
          :
            <Link to={`/q=${this.state.searchQuery}`} className="disabled" onClick={ (e) => e.preventDefault() }>
              {button}
            </Link>
          }
      </form>
    );
  }
}

export default SearchBar;
