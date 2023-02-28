

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

  getAllCharacters = () => {
    return (
      this.getResourse(`${this._apiBase}characters?limit=9&offset=200&${this._apiKey}`)
    )
  }

  getCharacter = (id) => {
    return (
      this.getResourse(`${this._apiBase}characters/${id}?&${this._apiKey}`)
    )
  }

}

export default MarvelService;