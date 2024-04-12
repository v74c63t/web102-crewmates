import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './CharacterDetail.css'
import { supabase } from "../../Client";
import CharacterDetailed from "../../components/CharacterDetailed/CharacterDetailed";

const CharacterDetail = () => {
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
          <CharacterDetailed character={character} />
        )
      :""}
    </div>
  )
}

export default CharacterDetail