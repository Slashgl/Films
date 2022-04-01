import React, { Component } from "react";
import "./Film.css";

export default class Film extends Component {
  render() {
    const { item } = this.props;

    const trimTheWord = (text) => {
      const dot = text.split('').slice(-1) === '.'

    }




    const { title, overview,vote_average, release_date, poster_path} = item;
    return (
        <span className="film">
          <div className='film__contain'>
            <img className='film__img' src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title}/>
          </div>
          <div className="film__info">
            <div className='film__header'>
              <h1>{title}</h1>
              <div className="film__circle">
                <div className='film__vote_average'>
                  {vote_average}
                </div>
              </div>
            </div>
            <h3 className='film__release'>{release_date}</h3>
            <div className="film__genre">
              <div className="film__option"><span className='film__option-span'>Action</span></div>
              <div className="film__option"><span className='film__option-span'>Drama</span></div>
            </div>
            <div className="film__description">{trimTheWord(overview)}</div>
            <div className="film__starts" > </div>
          </div>
        </span>
    );
  }
}
