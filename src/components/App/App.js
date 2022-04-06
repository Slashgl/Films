import React, { Component } from "react";

import "./App.css";
import Header from "../Header";
import ListFilms from "../List-films/List-films";
import MovieService from "../../services/services";
import Pagination from "../Pagination/Pagination";
import debounce from 'lodash.debounce';
import 'antd/dist/antd.css';

export default class App extends Component {
  movieService = new MovieService();
  state = {
      movies: [],
      value: '',
      loading: true,
      error: false,
      currentPage: 1,
      moviesPerPage: 6,
  };

    onChange = e => {
        this.setState({ value: e.target.value }, () =>
            this.movieService.getResource(this.state.value)
                .then((res) => {
                    this.setState({
                        movies: res.results,
                        loading: false,
                        error:false,
                    })
                }).catch(this.onError)
        )

    }
    debounceOnChange = debounce(this.onChange, 300)
    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

  componentDidMount() {
    this.movieService.getReturnMovie().then((movies) => {
        this.setState({
            movies: [...movies],
            loading: false,
            error: false,
        })
    }).catch(this.onError)
  }
  paginate = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        })
  }

  render() {
      const lastMovieIndex = this.state.currentPage * this.state.moviesPerPage
      const firstMovieIndex = lastMovieIndex - this.state.moviesPerPage
      const currentMovie = this.state.movies.slice(firstMovieIndex, lastMovieIndex)


    return (
      <div className="App">
        <div className='App__wrapper'>
            <Header />
            <input className="inputSearch" placeholder="Type to search..." onChange={this.debounceOnChange}/>
            <ListFilms
                data={currentMovie}
                loading={this.state.loading}
                error={this.state.error}
            />

        </div>
          <div className='Pagination'>
              <Pagination
                  moviesPerPage={this.state.moviesPerPage}
                  data={this.state.movies.length}
                  paginate={this.paginate}
                  currentPage={this.state.currentPage}
              />

          </div>
      </div>

    );
  }
}
