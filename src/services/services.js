export default class MovieService {
  urlBase = "https://api.themoviedb.org/3/";
  apiKey = "?api_key=aaf7120935dc388a62629d9039994774";

  async getResource(url) {
    const res = await fetch(`${this.urlBase}${url}${this.apiKey}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getMovie() {
    const res = await this.getResource(`movie/550`);
    return res;
  }

  async getAllMovie() {
    const res = await this.getResource(`discover/movie`);
    return res.results;
  }
}
