

class MarvelService {

  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=9d5b728a4a054346096f0e8f1a675d6b';

  getResourse = async (url) => {
    let res = await fetch(url);
  
    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    }
  
    return await res.json()
  }

  getAllCharacters = async () => {
    const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=200&${this._apiKey}`);
    res.data.results.map(this._transformCharacter(res.data.results[0]));
  }

  getCharacter = async (id) => {
    const res = await this.getResourse(`${this._apiBase}characters/${id}?&${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  }

  _transformCharacter = (char) => {
    return {
      nameChar: char.name,
      description: char.description > 210 ? char.description.slice(0,210) + '...' : 'There is no data about this character' ,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url
    }
  }
}

export default MarvelService;