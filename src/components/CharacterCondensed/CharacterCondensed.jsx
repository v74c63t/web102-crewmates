import './CharacterCondensed.css'
import { Link } from 'react-router-dom'

const CharacterCondensed = ({character}) => {
  return (
    <>
      <div className="character-con">
        <Link className='detail-link' to={`/character/${character.id}`}>
          <div className='name-con'>Name: {character.name}</div>
          <div className='basic-detail-con'>Element: {character.element}</div>
          <div className='basic-detail-con'>Path: {character.path}</div>
        </Link>
        <Link className="edit-link-con" to={`/edit/${character.id}`}>Edit this character</Link>
      </div>
    </>
  )
}

export default CharacterCondensed