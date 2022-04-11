import React, { Component } from "react";
import 'antd/dist/antd.css';
import "./App.css";
import Header from "../Header";
import store from "store";
import ListFilms from "../List-films/List-films";
import MovieService from "../../services/services";
import Pagination from "../Pagination/Pagination";
import debounce from 'lodash.debounce';
import {format, parseISO} from "date-fns";

export default class App extends Component {
  movieService = new MovieService();
  state = {
      movies: [],
      ratedMovie: [],
      value: '',
      loading: true,
      error: false,
      currentPage: 1,
      moviesPerPage: 6,
      guestSessionId: null,
      tabPane: '1',
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
      this.movieService.guestSession().then(guest => {
          this.setState({
              guestSessionId: guest.guest_session_id
          })
          console.log(guest)
      })
      this.getReturnMovie();
  }


  getReturnMovie = () => {

      this.movieService.getReturnMovie().then((movies) => {
          this.setState({
              movies: [...movies],
              loading: false,
              error: false,
          })
      }).catch(this.onError);
  }

    getRatedMovies = () => {
        const { guestSessionId } = this.state;
        const movieService = new MovieService();
        this.setState({
            ratedFilm: [],
            isLoading: true,
            error: false,
        });
        movieService
            .getMoviesRated(guestSessionId)
            .then((item) => {
                if (item.results.length === 0) {
                    this.setState({
                        isLoading: false,
                        error: true,
                    });
                }
                item.results.forEach((elm) => {
                    this.addRatedItemToList(elm);
                });
            })
            .catch(() => {
                this.setState({
                    isLoading: false,
                    error:true,
                });
            });

    };
    addRatedItemToList = (item) => {
        const newItem = this.createItem(item);

        this.setState(({ ratedFilm }) => {
            const newDataStream = [...ratedFilm, newItem];
            return {
                ratedFilm: newDataStream,
                isLoading: false,
            };
        });
    };
  changeTab = (key) => {
        if(key === '2') {
            this.setState({
                tabPane: key
            },() => {
                this.getRatedMovies();
            })
        }else  {
            this.setState({
                error: false,
                tabPane: key,
            }, () => {
                this.getReturnMovie();
            })
        }
  }

  changePage = () => {
        const { tabPane } = this.state
        this.setState({}, () => {
            if(tabPane === '1') {
                this.getReturnMovie();
            }else {
                this.getRatedMovies();
            }
        })
  }
  paginate = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        })
  }

    createItem = (item) => {
        const releaseDate = item.release_date ? format(parseISO(item.release_date), 'MMMM dd, yyyy') : 'no release date';
        const filmTitle = item.title || 'Movie title not specified';
        const overview = item.overview || 'Movie overview not specified';
        const popularity = item.vote_average || 0;
        const rating = store.get(`${item.id}`) || item.rating || 0;
        let posterURL = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        if (item.poster_path) {
            posterURL = `https://image.tmdb.org/t/p/w200${item.poster_path}`;
        }
        const genres = this.getGenresFilm(item.genre_ids);

        return {
            id: item.id,
            filmTitle,
            posterURL,
            releaseDate,
            overview,
            popularity,
            rating,
            genres,
        };
    };

  render() {
      const lastMovieIndex = this.state.currentPage * this.state.moviesPerPage
      const firstMovieIndex = lastMovieIndex - this.state.moviesPerPage
      const currentMovie = this.state.movies.slice(firstMovieIndex, lastMovieIndex)
      const inputTab1 = this.state.tabPane === '1'? <input className="inputSearch" placeholder="Type to search..." onChange={this.debounceOnChange}/> :null
      console.log(this.state)
    return (

            <div className="App">
                <div className='App__wrapper'>
                    <Header changeTab={this.changeTab}/>
                    {inputTab1}
                    <ListFilms
                        data={currentMovie}
                        loading={this.state.loading}
                        error={this.state.error}
                        guestSessionId={this.state.guestSessionId}
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
