import React, { Component } from "react";
import "./Film.css";

export default class Film extends Component {
  render() {
    const { item } = this.props;

    const { id, title, releaseDate, overview, posterPath, voteAverage } = item;
    return (
      <li className="film">
        <div>
          <img src="https://api.themoviedb.org/3/movie/500/images?api_key=aaf7120935dc388a62629d9039994774" />
          <div className="film__vote_average">{voteAverage}</div>
        </div>
        <div className="film__info">
          <h1>{title}</h1>
          <h3>{releaseDate}</h3>
          <div className="film__genre">
            <div className="film__genre--Action">Action</div>
            <div className="film__genre--Drama">Drama</div>
          </div>
          <div className="film__description">{overview}</div>
          <div className="film__starts"></div>
        </div>
      </li>
    );
  }
}
