export default class MovieService {
  url = 'https://api.themoviedb.org/3/'
  api_key = 'aaf7120935dc388a62629d9039994774'
  urlBase = `${this.url}search/movie?api_key=${this.api_key}&query=`;

  async getResource(url) {
    const resApiLink = url.length === 0 ? `${this.urlBase}return` : `${this.urlBase}${url}`
    const res = await fetch(resApiLink);
    if (!res.ok) {
      throw new Error(`Could not fetch, received ${res.status}`);
    }
    return await res.json();
  }

  async getReturnMovie(url = 'return') {
    const res = await this.getResource(url);
    return res.results;
  }
  async guestSession() {
    const guestSessionUrl = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=aaf7120935dc388a62629d9039994774`;
    return await this.getResource(guestSessionUrl);
  };
  async getMoviesRated(guestSessionId) {
    const url = `${this.url}/guest_session/${guestSessionId}/rated/movies?api_key=${this.api_key}`
    return await this.getResource(url)
  }
  setMovieRating = async (id, guestSessionId, rate) => {
    const url = `${this.url}movie/${id}/rating?api_key=${this.api_key}&guest_session_id=${guestSessionId}`;
    const body = {
      value: rate,
    };
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(body),
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Возникла проблема с fetch запросом: ', err.message);
    });
  };
  deleteRateMovie = async (id, guestSessionId) => {
    const url = `${this.url}movie/${id}/rating?api_key=${this.api_key}&guest_session_id=${guestSessionId}`;
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    await fetch(url, {
      method: 'DELETE',
      headers,
    });
  };

}
