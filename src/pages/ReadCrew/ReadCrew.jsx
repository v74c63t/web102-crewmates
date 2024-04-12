import { useState, useEffect } from "react"
import { supabase } from "../../Client"
import './ReadCrew.css'
import { Link } from "react-router-dom"
import CharacterCondensed from "../../components/CharacterCondensed/CharacterCondensed"

const ReadCrew = () => {
  const [characters, setCharacters] = useState([])
  const [message, setMessage] = useState("Loading...")

  useEffect(() => {
    const fetchCharacters = async() => {
      const {data} = await supabase
                          .from('crewmates')
                          .select()
                          .order('created_at', {ascending: false})
      setCharacters(data)
      if(data.length === 0) {
        setMessage("No Characters Yet")
      }
    }
    fetchCharacters()
  }, [])


  return (
    <div>
      <div className="view">
      <h2>Character Gallery</h2>
        {
          characters !== null && characters.length > 0 ? (
            <div>
              {
                characters.map((character, i) => {
                  return (
                    <CharacterCondensed key={i} character={character} />
                  )
                })
              }
            </div>
          ) : <h4>{message}</h4>
        }
        {message === 'No Characters Yet' ? (
          <h4>
            <Link to="/create">
              Start by Creating a Character Here
            </Link>
          </h4>
        ): ""}
      </div>
    </div>
  )
}

export default ReadCrew