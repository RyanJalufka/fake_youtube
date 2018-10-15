import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyDDO7tlImjQSAEVpvR5CqSERqJdTFUBHEI';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      videos: [],
      selectedVideo: null 
    };

    this.videoSearch('cats');
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }


  render() {
    const videoSearch = _.debounce((term ) => { this.videoSearch(term) }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList 
          videos={this.state.videos}
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));


// List of Components
// index.js is the root, all components branch from here

// 1) Search Bar
// 2) Video Player / Title and Description
// 3) Single video thumbnail
// 4) List of video thumbnails (3)
// 5) App.js container component (holds everything)
//
// index.js (App) is responsible for gettin youtube data
// it is the parent for every other component