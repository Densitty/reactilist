import React, { Component } from "react";

import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";
import youtube from "./apis/youtube";

class App extends Component {
  state = {
    videos: [],
  };

  searchWord = async (word) => {
    const response = await youtube.get("/search", {
      params: {
        q: word,
      },
    });
    const { items } = await response.data;
    // console.log(items);
    this.setState({
      videos: items,
      // when we make a search, automatically default the iframe to show the first item by selecting below
      selectedVideo: items[0],
    });
  };

  // when the App component mounts,
  componentDidMount() {
    // call the function that searches for a video
    this.searchWord("cars");
  }

  // get the selected video from the video details component (granchild) through prop-drilling
  onVideoSelect = (video) => {
    // console.log("video selected is ", video);
    this.setState({
      selectedVideo: video,
    });
  };

  render() {
    return (
      <main className="ui container">
        <section className="ui segment">
          <SearchBar onSearch={this.searchWord} />
        </section>

        {this.state.videos.length > 0 ? (
          <section className="ui grid">
            <aside className="ten wide column">
              {this.state.selectedVideo && (
                <VideoDetail {...this.state.selectedVideo} />
              )}
            </aside>

            <aside className="six wide column">
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </aside>
          </section>
        ) : (
          <div className="ui segment" style={{ height: "100vh" }}>
            <div className="ui active dimmer">
              <div className="ui massive text loader">Loading</div>
            </div>
            <p></p>
            <p></p>
            <p></p>
          </div>
        )}
      </main>
    );
  }
}

export default App;
