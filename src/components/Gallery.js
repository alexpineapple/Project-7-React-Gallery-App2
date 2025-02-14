import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom'
//import Item from './Item';
//modal view
import Modal from 'react-modal';


class Gallery extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null
    };
  }

  openModal = (imageUrl) => {
    this.setState({ selectedImage: imageUrl });
  };
  
  closeModal = () => {
    this.setState({ selectedImage: null });
  };
  
  componentDidMount = () => {

    //need to call the search function again, incase forward/back buttons are pressed.
    this.props.history.listen((location) => {
      //get query from the current url location
      let query = decodeURI(location.pathname.substring(3));
      //call search function from parent component!
      this.props.searchFunc(query);
    });
  }

  render() {
    // see if passed data has loaded & not undefined
    const loading = (this.props.data.isLoading !== undefined && this.props.data.isLoading);
  
    // assign images and searchTag
    let searchTerm = this.props.data.searchTag;
  
    // iterate through data to create all Gallery Items
    let images = this.props.data.images.map((image) => {
      const imageUrl = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_b.jpg`; // Larger size
      return (
        <li key={image.id} onClick={() => this.openModal(imageUrl)}>
          <img src={imageUrl} alt="Flickr" style={{ cursor: "pointer" }} />
        </li>
      );
    });
  
    // this will hold the gallery output
    let output;
  
    // display loading message while still loading
    if (loading) {
      output = (<p>Loading...</p>);
    } else {
      if (this.props.data.images.length > 0) {
        // there are results! display them!
        output = (
          <div className="photo-container">
            <p>Showing search results for:</p>
            <h1>{searchTerm}</h1>
            <ul>{images}</ul>
          </div>
        );
      } else {
        // no results found :(
        output = (
          <div>
            <h1>No results found</h1>
            <p>"{searchTerm}" did not return any results, please try again using a different search term.</p>
          </div>
        );
      }
    }
  
    // Now, return both the gallery output and the modal inside a parent container.
    return (
      <div>
        {output}
        <Modal
          isOpen={!!this.state.selectedImage}
          onRequestClose={this.closeModal}
          contentLabel="Image Preview"
          style={{
            overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              background: "none",
              border: "none",
              padding: 0
            }
          }}
        >
          {this.state.selectedImage && (
            <img
              src={this.state.selectedImage}
              alt="Enlarged preview"
              style={{ maxWidth: "90vw", maxHeight: "90vh", display: "block", margin: "auto" }}
              onClick={this.closeModal} // Close modal when image is clicked
            />
          )}
        </Modal>
      </div>
    );
  }
  
}
export default withRouter(Gallery);
