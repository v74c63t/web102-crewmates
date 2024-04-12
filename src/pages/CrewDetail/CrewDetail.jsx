import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './CrewDetail.css'
import { supabase } from "../../Client";

const CrewDetail = () => {
  const {id} = useParams()

  const [character, setCharacter] = useState(null)

  useEffect(() => {
    const getCharacter = async () => {
      const {data} = await supabase
                          .from('crewmates')
                          .select()
                          .eq('id', id)
      setCharacter(data[0])
    }
    getCharacter()
  }, [id])
  
  return(
    <div>
      {character !== null ?
        (
          <div className="detail">
            <h2>Name: {character.name}</h2>
            <h3>Element: {character.element}</h3>
            <h3>Path: {character.path}</h3>
            <h4>Base Stats</h4>
            <h5>HP: {character.hp}</h5>
            <h5>Attack: {character.atk}</h5>
            <h5>Defense: {character.def}</h5>
            <h5>Speed: {character.spd}</h5>
          </div>
        )
      :""}
    </div>
  )
}

export default CrewDetail