import React from "react";
import { Link } from "react-router-dom";

export const Tag = (props) => {
  const template = (
    <div
      style={{
        backgroundColor: props.bck,
        fontSize: props.size,
        color: props.color,
        padding: "5px 10px",
        display: "inline-block",
        fontFamily: "Righteous",
        ...props.add,
      }}
    >
      {props.children}
    </div>
  );

  if (props.link) {
    return <Link to={props.linkto}>{template}</Link>;
  } else {
    return template;
  }
};

export const firebaseLooper = (snapshot) => {
  const data = [];
  snapshot.forEach((childSnapshot) => {
    // console.log(childSnapshot);
    data.push({
      id: childSnapshot.key,
      ...childSnapshot.val(),
    });
  });
  return data;
};

export const reverseArray = (actualArray) => {
  const newArray = [];

  for (let i = actualArray.length - 1; i >= 0; i--) {
    newArray.push(actualArray[i]);
  }

  return newArray;
};
