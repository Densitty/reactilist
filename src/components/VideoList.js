import React from "react";
import VideoItem from "./VideoItem";

const VideoList = (props) => {
  const { onVideoSelect } = props;
  const { videos } = props;
  // console.log(videos.length);
  return (
    <div>
      {videos.length > 0 ? (
        <section className="ui relaxed divided list">
          {videos.map((video) => {
            // console.log(video);
            return (
              <div className="item" key={video.id.videoId}>
                <VideoItem onVideoSelect={onVideoSelect} {...video} />
              </div>
            );
          })}
        </section>
      ) : (
        <div>loading ...</div>
      )}
    </div>
  );
};

export default VideoList;
