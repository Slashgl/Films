import React from "react";

import "./List-films.css";
import Film from "../Film/Film";

const ListFilms = ({ data }) => {
    console.log(data)
   const element = data.slice(0, 6).map(item => {
        const {id} = item;
        return(
            <Film key={id}
                item={item}
            />
        )
    })
  return (
    <div className="movie">
      <div className="movie__list">{element}</div>
    </div>
  );
};

export default ListFilms;
