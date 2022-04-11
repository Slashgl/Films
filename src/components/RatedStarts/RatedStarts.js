import React from "react";
import './RatedStarts.css';
import {Rate} from "antd";
import store from 'store'
import MovieService from "../../services/services";


export default class RatedStarts extends React.Component {

    state = {
        // eslint-disable-next-line react/destructuring-assignment
        ratingValue: store.get(`${this.props.id}`) || 0,
    };

    setMovieRating = (rate) => {
        const { guestSessionId, id } = this.props;

        const movieService = new MovieService();
        this.setState({
            ratingValue: rate,
        });

        if (rate === 0) movieService.deleteRateMovie(id, guestSessionId);
        movieService.setMovieRating(id, guestSessionId, rate);
        store.set(`${id}`, `${rate}`);

    };

    render() {

        return(
            <Rate
                count={10}
                value={this.state.ratingValue}
                onChange={(rate) => {
                    this.setMovieRating(rate)
                }}
            />
        )
    }
}