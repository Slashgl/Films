import React, { Component } from "react";

import "./App.css";
import Header from "../Header";
import InputSearchMovie from "../Input-search-movie";
import ListFilms from "../List-films/List-films";
import MovieService from "../../services/services";

export default class App extends Component {
  movieService = new MovieService();
  state = {
      movies: [],
      loading: true,
      error: false
  };
    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

  componentDidMount() {
    this.movieService.getAllMovie().then((movies) => {
        this.setState({
            movies: [...movies],
            loading: false,
            error: false,
        })
    }).catch(this.onError)
  }

  render() {
    return (
      <div className="App">
        <div className='App__wrapper'>
            <Header />
            <InputSearchMovie />
            <ListFilms
                data={this.state.movies}
                loading={this.state.loading}
                error={this.state.error}/>
        </div>
      </div>
    );
  }
}
