import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import './charInfo.scss';

 const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {loading, error, process, setProcess, getCharacter, clearError} =  useMarvelService();

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    useEffect(() => {
        updateChar()
    }, [props.charId])

    const onCharLoaded = (char) => {
        setChar(char);
    }

   

    // const skeleton = char || loading || error ? null : <Skeleton/>
    // const spinner = loading ? <Spinner/> : null;
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss"
                    style={thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? { objectFit: 'contain'} : {}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There are no comics with this character'}
                {console.log(comics)}
                {comics.map((item, i) => {
                        if (i >= 10) return;
                        const comicArr = item.resourceURI.split('/');

                        const comicId = comicArr[comicArr.length - 1]
                        console.log(comicId)

                        return(
                            <li className="char__comics-item" key={i}>
                                <Link to={`/comics/${comicId}`}>{item.name}</Link>    
                            </li>
                        )
                    })

                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;
