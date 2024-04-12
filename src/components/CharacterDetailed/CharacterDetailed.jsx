import './CharacterDetailed.css'
import { Link } from 'react-router-dom'

const CharacterDetailed = ({character}) => {
  return (
    <>
      <div className="character">
        <div className='name'>Name: {character.name}</div>
        <div className='basic-detail'>
          <div>Element: {character.element}</div>
          <div>Path: {character.path}</div>
        </div>
        <div className='stats-header'>Base Stats</div>
        <div className='stats'>
          {/* <div> */}
            <div>HP: {character.hp}</div>
            <div>Attack: {character.atk}</div>
          {/* </div>
          <div> */}
            <div>Speed: {character.spd}</div>
            <div>Defense: {character.def}</div>
          {/* </div> */}
        </div>
        <Link className="edit-link" to={`/edit/${character.id}`}>Update this character</Link>
      </div>
    </>
  )
}

export default CharacterDetailed