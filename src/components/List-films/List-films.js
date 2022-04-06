import React from "react";
import "./List-films.css";
import Film from "../Film/Film";
import Spinner from "../Spinner/Spinner";
import ErrorIndicator from "../error-indicator";
import InformationalIndicator from "../Informational-indicator/Informational-indicator";

const ListFilms = ({ data, loading, error }) => {

   const element = data.map(item => {
        const {id} = item;
        return(
            <Film key={id}
                item={item}
            />
        )
    })
    const hasData = !(loading || error)
    const dontData = !loading && element.length === 0
    const spinner = loading ? <Spinner/> : null;
    const content = hasData ? element : null;
    const errorIndicator = error ? <ErrorIndicator/> : null;
    const infoIndicator = dontData ? <InformationalIndicator />: null

  return (
    <div className="movie">
      <div className="movie__list">
          {errorIndicator}
          {spinner}
          {content}
          {infoIndicator}
      </div>
    </div>
  );
};

export default ListFilms;
