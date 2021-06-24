import React from "react";

const VideoDetail = (props) => {
  // console.log(props);
  const { snippet, id } = props;
  const { videoId } = id;
  const { title, description } = snippet;

  const videoSrc = "https://www.youtube.com/embed";
  // console.log(videoId);
  return (
    <div>
      <div className="ui embed">
        <iframe
          src={`${videoSrc}/${videoId}`}
          title="video player"
          frameBorder="0"
        ></iframe>
      </div>

      <div className="ui segment">
        <h4 className="ui header">{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default VideoDetail;
