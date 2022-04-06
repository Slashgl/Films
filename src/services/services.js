export default class MovieService {
  urlBase = "https://api.themoviedb.org/3/search/movie?api_key=aaf7120935dc388a62629d9039994774&query=";

  async getResource(url) {
    const resApiLink = url.length === 0 ? `${this.urlBase}return` : `${this.urlBase}${url}`
    const res = await fetch(resApiLink);
    if (!res.ok) {
      throw new Error(`Could not fetch, received ${res.status}`);
    }
    return await res.json();
  }

  async getReturnMovie() {
    const res = await this.getResource('return');
    return res.results;
  }
  async getAllMovie() {
    const res = await this.getResource();
    return res.results;
  }
}
