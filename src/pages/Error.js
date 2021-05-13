import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <section className="error-page section">
      <div className="error-container">
        <h1>Sorry! You have reached a dead end.</h1>
        <Link to="/" className="btn btn-primary">
          home page
        </Link>
      </div>
    </section>
  );
}
