import { useParams} from 'react-router';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const SingleComicPage = () => {
  const {comicId} = useParams();

  const [comic, setComic] = useState({});

  const {loading, error, getComic, clearError} = useMarvelService();

  useEffect(() => {
      viewComic()
  }, [comicId])

  const viewComic = () => {
    clearError()
    getComic(comicId)
      .then(onComicLoaded)
  }

  const onComicLoaded = (comic) => {
    setComic(comic);
  }

  const spinner = loading ? <Spinner/> : null;
  const errorMessage = error ? <ErrorMessage/> : null;
  const content = !(loading || error ||!comic) ? <View comic={comic}/> : null;

  return (
    <>
      {content}
      {spinner}
      {errorMessage}
    </>
  )
}

const View = ({comic}) => {
    const {description, thumbnail, title, pageCount, price, language} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;
