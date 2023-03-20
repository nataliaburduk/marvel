import { useHttp } from "../hooks/http.hook";

const useMarvelService = () =>{
  const {loading, request, error, clearError} = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=9d5b728a4a054346096f0e8f1a675d6b';
  const _baseOffset = 500;
  
  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComics);
  }

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?&${_apiKey}`);
    return _transformComics(res.data.results[0]);
  }

  const _transformComics = (comic) => {
    return {
      id: comic.id,
      title: comic.title,
      description: comic.description ? comic.description : 'There is no description yet',
      thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
      price: comic.prices[0].price > 0 ? comic.prices[0].price + '$' : 'NOT AVAILABLE',
      pageCount: comic.pageCount ? `${comic.pageCount} pages` : "No information about the number of pages",
      language: comic.textObjects[0]?.language || "en-us",
      issueNumber: comic.issueNumber
    }
  }

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description > 210 ? (char.description.slice(0,10) + '...') : 'There is no data about this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }

  return {loading, error, getAllCharacters, getCharacter, getCharacterByName, getAllComics, getComic, clearError}
}

export default useMarvelService;