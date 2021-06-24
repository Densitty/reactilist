import React from "react";

const VideoItem = (props) => {
  // console.log(props);
  const { onVideoSelect } = props;
  const { snippet } = props;
  const { title, thumbnails } = snippet;
  const { medium } = thumbnails;

  // const selectVideo = () => {
  //   onVideoSelect(props);
  // };

  return (
    <div onClick={() => onVideoSelect(props)} className="item video-item">
      <img className="ui image" src={medium.url} alt={title} />
      <div className="content">
        <div className="header">{title}</div>
      </div>
    </div>
  );
};

export default VideoItem;
