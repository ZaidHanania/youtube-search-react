import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

import { API_KEY } from './config';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      videos: [], 
      selectedVideo: null 
    };

    // Default starting search
    this.videoSearch('Cat Videos');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
       });
    });
  }

  render() {
    // throttles search
    const videoSerach = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
        <div>
          <SearchBar onSearchTermChange={videoSerach} />
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList 
            onVideoSelect={ selectedVideo => this.setState({selectedVideo}) }
            videos={this.state.videos} />
        </div>
      );
  }
}


// App is class, wrap in JSX tags to make instance

// Take this component's generated HTML and put it in the DOM.
ReactDOM.render(<App />, document.querySelector('.container'));