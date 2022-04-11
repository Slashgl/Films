import React, { Component } from "react";
import { format } from 'date-fns'
import "./Film.css";
import RatedStarts from "../RatedStarts/RatedStarts";
import {Card} from "antd";

export default class Film extends Component {
  render() {
    const { item, guestSessionId } = this.props;
    const { title, overview,vote_average, release_date, poster_path, id, } = item;
    const trimTheWord = (text) => {
      return text.split(' ').slice(0, 30).join(' ').concat('...')
    }
    let styleCircle = {}

    if(vote_average > 0 && vote_average <= 3) {
        styleCircle.border = '2px solid #E90000';
    }else if(vote_average > 3 && vote_average <= 5) {
      styleCircle.border = '2px solid #E97E00';
    }else if(vote_average > 5 && vote_average <= 7) {
      styleCircle.border = '2px solid #E9D100';
    }else {
      styleCircle.border = '2px solid #66E900';
    }
    return (
        <Card>
            <img className="card-img" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title}/>
            <div className="card-movie-title">{title}</div>
            <div style={styleCircle} className="card-popularity-count">{vote_average}</div>
            <h3 className="card-release-date">{format(new Date(release_date), 'MMMM dd, yyyy')}</h3>
            <div className="card-tags"> </div>
            <div className="card-overview">{trimTheWord(overview)}</div>
            <RatedStarts id={id} guestSessionId={guestSessionId}/>
        </Card>
    );
  }
}
