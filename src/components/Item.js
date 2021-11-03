import React from 'react';

//the little individual gallery item
const Item = (props) => {

    return (
        <li key={props.ghostKey}>
            <img src={props.url} key={props.ghostKey} alt=""></img>
        </li>
    )
}

export default Item;
