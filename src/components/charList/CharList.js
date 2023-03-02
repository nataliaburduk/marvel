import { Component } from 'react';
import { PropTypes } from 'prop-types';
import MarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newCharsLoading: false,
        offset: 210,
        charEnded: false
    }
    
    marvelService = new MarvelService();

    onLoadMoreChar = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
        .then(this.onListLoaded)
        .catch(this.onError)
    }

    componentDidMount() {
        this.onLoadMoreChar();
    }


    onListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({charList, offset}) =>({
            charList: [...charList, ...newCharList], 
            offset: offset + 9,
            loading: false,
            newCharsLoading: false,
            charEnded: ended
        }))
    }
    

    onCharListLoading = () => {
        this.setState({
            newCharsLoading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }    

    renderListItem = (item) => {
        return(
        <li className="char__item" key={item.id} 
        onClick={() => this.props.onCharSelected(item.id)}>
            <img src={item.thumbnail} alt="List image"
                style={item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? { objectFit: 'fill'} : {}}/>
            <div className="char__name">{item.nameChar}</div>
        </li>
        )
}

    render() {
        const {charList, offset, newCharsLoading, loading, error, charEnded} = this.state;
        const items = charList.map(item => this.renderListItem(item));

        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || errorMessage) ? items : null;


    return (

        <div className="char__list">
            <ul className="char__grid">
                {content}
                {spinner}
                {errorMessage}
            </ul>
            <button 
                className="button button__main button__long" 
                onClick={() => this.onLoadMoreChar(offset)} 
                disabled={newCharsLoading}
                style={{display: charEnded ? 'none': 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
   }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;