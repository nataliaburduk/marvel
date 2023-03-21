import { useParams} from 'react-router';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
// import Spinner from '../Spinner/Spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({Component, dataType}) => {
  const {id} = useParams();
  const [data, setData] = useState({});
  const {process, setProcess, getComic, getCharacter, clearError} = useMarvelService();

  useEffect(() => {
      viewData()
  }, [id])

  const viewData = () => {
    clearError()
    
    switch (dataType) {
      case 'comic':
          getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'))
          break;
      case 'character':
          getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'))
  }
  }

  const onDataLoaded = (data) => {
    setData(data);
  }

  return (
    <>
      <AppBanner/>
      {setContent(process, Component, data)}
    </>
  )
}

export default SinglePage;