import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

const url = "https://course-api.com/react-tabs-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [workExperience, setWorkExperience] = useState([]);
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      setWorkExperience(data);
      setLoading(false);
    } catch (e) {
      console.log(e.message());
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // while we are awaiting the data
  if (loading) {
    return (
      <section className="section loading">
        <h1>loading...</h1>
      </section>
    );
  }

  const { company, dates, duties, title } = workExperience[value];

  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {workExperience.map((item, index) => {
            return (
              <button
                key={item.id}
                className={`job-btn ${index === value ? "active-btn" : ""}`}
                onClick={() => setValue(index)}
              >
                {item.company}
              </button>
            );
          })}
        </div>
        {/* workExperience info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon" />
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default App;
