import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComic.scss';

const SingleComic = (props) => {

    const [comic, setComic] = useState({});

    const {loading, error, getComic} = useMarvelService();

    const viewComic = () => {
        const {comicId} = props;
        if (!comicId) {
            return;
        }
        getComic(comicId)
            .then(onComicLoaded)
    }

    useEffect(() => {
        viewComic()
    }, [props.comicId])

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error) ? <View comic={comic}/> : null;

    return (
        <div className="single-comic">
            {content}
            {spinner}
            {errorMessage}
            <a href="#" className="single-comic__back">Back to all</a>
        </div>
    )
}

const View = ({comic}) => {
    const {description, thumbnail, title, pageCount, price, language} = comic;

    return (
        <>
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
        </>
    )
}

export default SingleComic;
