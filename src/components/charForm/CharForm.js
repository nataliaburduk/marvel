import {useState} from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';

import './charForm.scss';

const CharForm = () => {
    const [chars, setChar] = useState(null);
    const {process, setProcess, getCharacterByName, clearError} = useMarvelService();

    const onCharLoaded = (chars) => {
        setChar(chars);
    }

    const updateChar = (name) => {
      clearError();
      
      getCharacterByName(name)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'))
    }

    const errorMessage = process === 'error' ? <div className="char__form-critical-error"><ErrorMessage /></div> : null;
    const results = !chars ? null : chars.length > 0 ?
                    <div className="char__form-wrapper">
                        <div className="char__form-success">There is! Visit {chars[0].name} page?</div>
                        <Link to={`/characters/${chars[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> : 
                    <div className="char__form-error">
                        The character was not found. Check the name and try again
                    </div>

    return (
        <div className="char__form">
            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit = { ({charName}) => {
                    updateChar(charName);
                }}
            >
                <Form>
                    <label className="char__form-text" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__form-wrapper">
                        <Field 
                            className="char__form-input"
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={process === 'loading'}>
                            <div className="inner">Find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__form-error" name="charName" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default CharForm;
