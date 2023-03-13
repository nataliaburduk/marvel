import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const ComicsList = () => {

    const [comics, setComics] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onLoadMoreComics(offset, true);
    }, []);

    const onLoadMoreComics = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true)
        getAllComics(offset)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }
        setComics(comics=> [...comics, ...newComics]);
        setOffset(offset => offset+8);
        setNewComicsLoading(false);
        setComicsEnded(ended);
    }

    function renderComic(item, i) {
        return(
            <li className="comics__item"
                tabIndex={0}
                key={item.id}>
                <Link to={`/comics/${item.id}`}>
                    <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </Link>
            </li>
        )
    }

    const items = comics.map((item, i) => renderComic(item, i));

    const spinner = loading && !newComicsLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;


    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {items}
                {spinner}
                {errorMessage}
            </ul>
            <button className="button button__main button__long"
                    onClick={() => onLoadMoreComics(offset)} 
                    disabled={newComicsLoading}
                    style={{display: comicsEnded ? 'none': 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;