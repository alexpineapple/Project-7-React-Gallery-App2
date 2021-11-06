import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

//history
import { createBrowserHistory } from 'history'

//styles
import "./css/index.css"
import './App.css';

//components
import Header from './components/Header';
import Home from './components/Home';
import Gallery from './components/Gallery';
import Error from './components/Error';

//API key
import key from './config.js';

//navigation button presets
import navPresets from './navPresets';

class App extends Component {

  constructor () {
    super();

    //initialize state
    this.state = {
      images: [],
      searchTag: '',
      isLoading: true,
    }

    //get static images to pre-load for the nav buttons
    let staticPics = {};

    //iterate per each preset, update the staticPics object
    navPresets.map((preset, index) =>
      staticPics[preset] = {
        images: [],
        searchTag: preset,
        isLoading: true,
      }
    );

    this.staticPics = staticPics;
  }

  //reset functionality
  resetLoadState = () => {
    this.setState({
      images: [],
      searchTag: '',
      isLoading: true
    })
  }

  //this function will fetch a query from the search bar
  performSearch = (query) => {

    //need to clear out old data just in case
    this.resetLoadState();

    //fetch request for the provided query
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        images: json.photos.photo,
        searchTag: query,
        isLoading: false,
      })
    })
    .catch(err => {
      console.log('Encountered an error fetching from the Flickr API 😱', err);
    })
  }

  //this function pre-loads static data for the navigation buttons
  loadPresetImages = () => {

    //iterate through each present and fetch the data for each nav button!
    navPresets.map((preset, index) =>
      fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${preset}&per_page=24&format=json&nojsoncallback=1`)
        .then(res => res.json())
        .then(json => {
              this.staticPics[preset].images = json.photos.photo
              this.staticPics[preset].isLoading = false
              this.setState({
                isLoading: false
              })
            })
        .catch(err => {
          console.log('Encountered an error fetching from the Flickr API 😱', err)
        })
      );
  }

  componentDidMount() {

    //pre-load all the images for the nav presets
    this.loadPresetImages()

    //re-fetch data if window is refreshed
    let query = decodeURI(window.location.pathname.substring(3))

    if(window.location.pathname.includes('q=') && this.state.searchTag === ''){
      //perfrom search with extracted search term!
      this.performSearch(query)
    }
  }

  render() {

    const history = createBrowserHistory();

    //update state searchTag with url
    let searchTag = history.location.pathname.substring(3);

    //get the pre-defined routes for the navigation buttons
    const navRoutes = navPresets.map((preset, index) =>
      <Route exact path={"/q=" + preset} key={index} component={() => <Gallery data={this.staticPics[preset]} searchTag={this.staticPics[preset].searchTag} searchFunc={this.performSearch} key={index}></Gallery>}></Route>
    )

    return (
      <BrowserRouter>
        <div className="container">
          <Header searchFunc={this.performSearch}></Header>

          {/*router switch section*/}
          <Switch>

            {/*HOME route*/}
            <Route exact path="/" component={Home}></Route>
            {/*routes for navigation preset buttons*/}
            {navRoutes}
            {/*routes for search queries*/}
            <Route exact path="/q=:query" render={() => <Gallery data={this.state} searchTag={searchTag} searchFunc={this.performSearch}></Gallery>}></Route>
            {/*routes if all else fails!*/}
            <Route component={Error}/>

          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
