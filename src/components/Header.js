import React from 'react';
import SearchBar from './SearchBar';
import Nav from './Nav';

//header holds both the search bar and nav links. Both need the searchFunc
const Header = (props) => {
    return (
        <div>
            <SearchBar searchFunc={props.searchFunc}></SearchBar>
            <Nav searchFunc={props.searchFunc}></Nav>
        </div>
    )
}

export default Header;
