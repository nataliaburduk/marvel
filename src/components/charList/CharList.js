import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
        .then(this.onListLoaded)
        .catch(this.onError)

        // this.foo.bar = 0;

    }

    onListLoaded = (charList) => {
        this.setState({
            charList, 
            loading: false
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
        const {charList} = this.state;

        const items = charList.map(item => this.renderListItem(item));
        console.log(items)

    return (

        <div className="char__list">
            <ul className="char__grid">
                {items}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
   }
}

export default CharList;