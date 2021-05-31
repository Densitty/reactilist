import React from "react";
import { matchesCollection } from "../../../firebase";
import { firebaseLooper, reverseArray } from "../../utils/miscellanous";

const Blocks = () => {
  const [matches, setMatches] = React.useState([]);

  // make a request to the server [useEffect is used]
  React.useEffect(() => {
    matchesCollection
      .limitToLast(6)
      .once("value")
      .then((snapshot) => {
        // console.log(snapshot.val());
        const matches = firebaseLooper(snapshot);
        // console.log(matches);
        // matches = reverseArray(matches);
        setMatches({
          matches: reverseArray(matches),
        });
      });
  }, [matches]);

  const showMatches = () => {
    return <div>match</div>;
  };

  return <div className="home_matches">{showMatches(matches)}</div>;
};

// class Blocks extends React.Component {
//   state = {
//     matches: [],
//   };

//   componentDidMount() {
//     /* matchesCollection
//       .limitToLast(6)
//       .once("value")
//       .then((snapshot) => {
//         console.log(snapshot.val());
//       }); */

//     matchesCollection
//       .limitToLast(6)
//       .once("value")
//       .then((snapshot) => {
//         console.log(snapshot.val());
//       });
//   }

//   showMatches = () => {
//     return <div>match</div>;
//   };

//   render() {
//     return (
//       <div className="home_matches">{this.showMatches(this.state.matches)}</div>
//     );
//   }
// }

export default Blocks;
