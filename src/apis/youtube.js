import axios from "axios";
const KEY = "AIzaSyCk4R8w3nZb944TRA0CKe7aJ9uiNlMc7Ag";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResult: 5,
    type: "video",
    key: KEY,
  },
});
