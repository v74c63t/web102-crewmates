import { useEffect, useState } from 'react'
import './CharacterDetailed.css'
import { Link } from 'react-router-dom'

const CharacterDetailed = ({character}) => {
  const [description, setDescription] = useState('')

  useEffect(() => {
    const constructDescription = () => {
      if(character.path === 'Abundance') {
        setDescription('This character seems to be a healer. Consider using this character as a sustain to heal your DPS.')
      }
      else if(character.path === 'Hunt') {
        setDescription('This character has a lot of speed. This character may be viable as a DPS. Consider using this character if you want to outspeed your enemies.')
      }
      else if(character.path === 'Preservation') {
        setDescription('This character seems to be a tank. Consider using this character as a sustain to shield your DPS.')
      }
      else if(character.path === 'Destruction') {
        setDescription('This character has a lot of attack. Consider using this character as your DPS.')
      }
      else if(character.path === 'Nihility') {
        setDescription('This character specilizes in debuffs.')
      }
      else if(character.path === 'Erudition') {
        setDescription('This character specilizes in AOE damage. Consider using this character when you have to fight a lot of enemies at once.')
      }
      else if(character.path === 'Harmony') {
        setDescription('This character specializes in buff. Consider using this character to strengthen your DPS.')
      }
    }
    constructDescription()
  }, [character])


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
          <div>HP: {character.hp}</div>
          <div>Attack: {character.atk}</div>
          <div>Speed: {character.spd}</div>
          <div>Defense: {character.def}</div>
        </div>
        <div className='description'>{description}</div>
        <Link className="edit-link" to={`/edit/${character.id}`}>Update this character</Link>
      </div>
    </>
  )
}

export default CharacterDetailed