import { useState, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newCharsLoading, setNewCharsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onLoadMoreChar(offset, true);
    }, []);

    const onLoadMoreChar = (offset, initial) => {
        initial ? setNewCharsLoading(false) : setNewCharsLoading(true)
        getAllCharacters(offset)
            .then(onListLoaded)
    }

    const onListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        setCharList(charList=> [...charList, ...newCharList]);
        setOffset(offset => offset+9);
        setNewCharsLoading(false);
        setCharEnded(ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderListItem (item, i) {
        return(
            <li 
            ref={el => itemRefs.current[i] = el}
            className="char__item" 
                tabIndex={0}
                key={item.id} 
                onClick={() => { 
                    props.onCharSelected(item.id); 
                    focusOnItem(i);
                }}
                onKeyPress = {(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }
                }}>
                    <img src={item.thumbnail} alt="List image"
                        style={item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? { objectFit: 'fill'} : {}}/>
                    <div className="char__name">{item.nameChar}</div>
            </li>
        )
    }

    const items = charList.map((item, i) => renderListItem(item, i));

    const spinner = loading && !newCharsLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="char__list">
            <ul className="char__grid">
                {items}
                {spinner}
                {errorMessage}
            </ul>
            <button 
                className="button button__main button__long" 
                onClick={() => onLoadMoreChar(offset)} 
                disabled={newCharsLoading}
                style={{display: charEnded ? 'none': 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
