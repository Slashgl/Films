import React from "react";
import "./List-films.css";
import Film from "../Film/Film";
import Spinner from "../Spinner/Spinner";
import ErrorIndicator from "../error-indicator";

const ListFilms = ({ data, loading, error }) => {

   const element = data.slice(0, 6).map(item => {
        const {id} = item;
        return(
            <Film key={id}
                item={item}
            />
        )
    })
    const hasData = !(loading || error)
    const spinner = loading ? <Spinner/> : null;
    const content = hasData ? element : null;
    const errorIndicator = error ? <ErrorIndicator/> : null;

  return (
    <div className="movie">
      <div className="movie__list">
          {errorIndicator}
          {spinner}
          {content}
      </div>
    </div>
  );
};

export default ListFilms;
