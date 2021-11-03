import React from 'react';
import Item from './Item';

const Gallery = (props) => {

    //see if passed data has loaded & not undefined
    const loading = (props.data.isLoading !== undefined && props.data.isLoading);

    //assign images and searchTag
    let searchTerm = props.data.searchTag;

    //iterate through data to create all Gallery Items
    let images = props.data.images.map((image, index) =>
      <Item
      //pass in url and key to each gallery item
          url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_n.jpg`}
          key={image.id}
          ghostKey={image.id} //spooooky
          //for some reason, "key" was giving me issues when passing the prop down.
      />
    )

    //this will hold the gallery output
    let output;

    //display loading message while still loading
    if (loading) {
      output = (<p>Loading...</p>)
    } else {

      //check for no results!
      if (props.data.images.length > 0) {

        //there's results! display them!
        output = (
          <div className="photo-container">
            <p>Showing search results for:</p>
            <h1>{searchTerm}</h1>
            <ul>
                {images}
            </ul>
          </div>
        );

      } else {

        //no results found :(
        output = (
          <div>
            <h1>No results found</h1>
            <p>"{searchTerm}" did not return any results, please try again using a different search term.</p>
          </div>
        );
      }
    }

    return(output);
}

export default Gallery;
