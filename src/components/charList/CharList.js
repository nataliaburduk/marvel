import { useState, useEffect, useRef, useMemo } from 'react';
import { PropTypes } from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const setContent = (process, Component, newCharsLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newCharsLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected process state')
    }
}
 
const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newCharsLoading, setNewCharsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {process, setProcess, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onLoadMoreChar(offset, true);
    }, []);

    const onLoadMoreChar = (offset, initial) => {
        initial ? setNewCharsLoading(false) : setNewCharsLoading(true)
        getAllCharacters(offset)
            .then(onListLoaded)
            .then(() => setProcess('confirmed'))
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

    function renderItems (arr){
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                    <li 
                        className="char__item"
                        key={item.id}
                        tabIndex={0}
                        ref={el => itemRefs.current[i] = el}
                        onClick={() => {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelected(item.id);
                                focusOnItem(i);
                            }
                        }}>
                            <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                            <div className="char__name">{item.name}</div>
                    </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const elements = useMemo(() => {
        return (
            setContent(process, () => renderItems(charList), newCharsLoading)
            )
    }, [process])

    return (
        <div className="char__list">
            {elements}
            <button 
                disabled={newCharsLoading} 
                style={{'display' : charEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onLoadMoreChar(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;