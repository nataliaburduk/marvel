import { useParams} from 'react-router';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({Component, dataType}) => {
  const {id} = useParams();
  const [data, setData] = useState({});
  const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

  useEffect(() => {
      viewData()
  }, [id])

  const viewData = () => {
    clearError()
    
    switch (dataType) {
      case 'comic':
          getComic(id).then(onDataLoaded);
          break;
      case 'character':
          getCharacter(id).then(onDataLoaded);
  }
  }

  const onDataLoaded = (data) => {
    setData(data);
  }

  const spinner = loading ? <Spinner/> : null;
  const errorMessage = error ? <ErrorMessage/> : null;
  const content = !(loading || error ||!data) ? <Component data={data}/> : null;

  return (
    <>
      <AppBanner/>
      {content}
      {spinner}
      {errorMessage}
    </>
  )
}

export default SinglePage;