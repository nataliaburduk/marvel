import { useParams} from 'react-router';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleCharacterPage.scss';
import AppBanner from '../appBanner/AppBanner';

const SingleCharacterPage = () => {
  const {charId} = useParams();
  const [character, setCharacter] = useState({});
  const {loading, error, getCharacter, clearError} = useMarvelService();

  useEffect(() => {
      viewChacater()
  }, [charId])

  const viewChacater = () => {
    clearError()
    getCharacter(charId)
      .then(onCharacterLoaded)
  }

  const onCharacterLoaded = (character) => {
    setCharacter(character);
  }

  const spinner = loading ? <Spinner/> : null;
  const errorMessage = error ? <ErrorMessage/> : null;
  const content = !(loading || error ||!character) ? <View character={character}/> : null;

  return (
    <>
      <AppBanner/>
      {content}
      {spinner}
      {errorMessage}
    </>
  )
}

const View = ({character}) => {
    const {description, thumbnail, name} = character;

    return (
        <div className="single-character">
            <img src={thumbnail} alt={name} className="single-character__img"/>
            <div className="single-character__info">
                <h2 className="single-character__name">{name}</h2>
                <p className="single-character__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharacterPage;
