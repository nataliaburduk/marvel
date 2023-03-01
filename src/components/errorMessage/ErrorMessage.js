import errorImg from './error.gif';
import './errorMessage.scss'

const ErrorMessage = () => {
  return (
    <img src={errorImg} alt='Error image'/>
  )
}

export default ErrorMessage;