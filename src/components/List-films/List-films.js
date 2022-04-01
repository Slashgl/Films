import React from "react";

import "./List-films.css";

const ListFilms = ({ data }) => {
  console.log(data);
  return (
    <div className="movie">
      <ul className="movie-list">{}</ul>
    </div>
  );
};

export default ListFilms;
