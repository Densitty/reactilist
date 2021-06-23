import { useState, useEffect } from "react";
import paginate from "./utils";
const url = "https://api.github.com/users/john-smilga/followers?per_page=100";

export const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    // to paginate the data received from the api, we pipe the data received to paginate function
    const newData = paginate(data);
    setData(newData);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return { loading, data };
};
