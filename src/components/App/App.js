import React, { Component } from "react";

import "./App.css";
import Header from "../Header";
import InputSearchMovie from "../Input-search-movie";
import ListFilms from "../List-films/List-films";
import MovieService from "../../services/services";

export default class App extends Component {
  movieService = new MovieService();
  state = {
    movie: [],
  };

  componentDidMount() {
    this.movieService.getAllMovie().then((movies) => {
      movies.map((item) => {
        return this.setState({
          movie: [...item],
        });
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <InputSearchMovie />
        <ListFilms data={this.state.movie} />
      </div>
    );
  }
}
