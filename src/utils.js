const paginate = (followers) => {
  // console.log(followers);
  // to paginate, we slice the data received into smaller arrays, which will give an array inside an array
  const itemsPerPage = 9;
  const pages = parseInt(followers.length / itemsPerPage);
  // parseInt or Math.ceil to get a whole number
  // console.log(pages);

  const itemsToPlaceInsideIterables = (_, index) => {
    // _ is a placeholder because we do not need it
    const startOfListPerPage = index * itemsPerPage;
    const endOfListPerPage = startOfListPerPage + itemsPerPage;
    /* console.log({
      index,
      start,
      endOfListPerPage,
    }); */
    // console.log(followers.slice(startOfListPerPage, endOfListPerPage));
    return followers.slice(startOfListPerPage, endOfListPerPage);
  };

  const newFollowers = Array.from(
    { length: pages },
    itemsToPlaceInsideIterables
  );
  // Array.from() receives an iterable (pages is not iterable cos it's a number)
  // console.log(newFollowers);
  return newFollowers;
};

export default paginate;
