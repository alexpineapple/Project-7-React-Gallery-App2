import React from 'react';
import navPresets from '../navPresets';
import { Link } from 'react-router-dom';

const Nav = () => {

  //create links from the navPresets Specified
  let buttons = navPresets.map((preset, index) =>
    <Link to={"/q=" + preset} key={index}>{preset}</Link>
  );

  let output = (
    <nav className= "main-nav">
      <ul>
        {buttons}
      </ul>
    </nav>
  );
  return output;
}

export default Nav;
