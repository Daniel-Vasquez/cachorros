import './styles/Error.css'

const Error = (props) => {
  return (
    <div className='pageError'>
      <h1>
        Error {props.error.message}, volver a intentar.
      </h1>
    </div>
  )
}

export default Error
