import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './EditCrew.css'
import { supabase } from "../../Client";


const EditCrew = () => {

  const {id} = useParams()
  const [min, setMin] = useState(1)
  // const [max, setMax] = useState(200)

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

  const handleChange = (event) => {
    const {name, value} = event.target;
    setCharacter( (prev) => {
        return {
            ...prev,
            [name]:value,
        }
    })
  }

  // const createCharacter = async(event) => {
  //   event.preventDefault()
  //   console.log(character)
  //   await supabase
  //         .from('crewmates')
  //         .insert(character)
  //         .select()
  //   window.location.replace('/')

  // }

  // const handleReset = (event) => {
  //   event.preventDefault()
  //   setCharacter({
  //     'name': "",
  //     'path': "Preservation",
  //     'element': "Ice",
  //     'atk': min,
  //     'spd': min,
  //     'hp': min,
  //     'def': min
  //   })
  //   setMin(1)
  //   // setMax(200)
  // }

  const updateCharacter = async (event) => {
    event.preventDefault()
    await supabase
        .from('crewmates')
        .update(character)
        .eq('id', id);
    window.location.replace('/')
  }

  const deleteCharacter = async (event) => {
    event.preventDefault()
    await supabase
        .from('crewmates')
        .delete()
        .eq('id', id);
    window.location.replace('/')
  }

  return (
    <div>
      {character !== null ?
        (
          <div className="edit">
            <form>
              <label htmlFor="name">Name</label> <br />
              <input type="text" id="name" name="name" value={character.name} onChange={handleChange} /><br />
              <br/>

              <label htmlFor="path">Path: </label>
              <select name="path" id="path" value={character.path} onChange={e => {setCharacter((prev) => {
                                                                                    return ({...prev,
                                                                                    'path': e.target.value})
                                                                                  })}}>
                <option value="Preservation">Preservation</option>
                <option value="Destruction">Destruction</option>
                <option value="Hunt">Hunt</option>
                <option value="Erudition">Erudition</option>
                <option value="Harmony">Harmony</option>
                <option value="Nihility">Nihility</option>
                <option value="Abundance">Abundance</option>
              </select>
              <br /> 
              <br/> 

              <label htmlFor="element">Element: </label>                                                                       
              <select name="element" id="element" value={character.element} onChange={e => {setCharacter((prev) => {
                                                                                    return ({...prev,
                                                                                    'element': e.target.value})
                                                                                  })}}>
                <option value="Ice">Ice</option>
                <option value="Physical">Physical</option>
                <option value="Fire">Fire</option>
                <option value="Lightning">Lightning</option>
                <option value="Wind">Wind</option>
                <option value="Quantum">Quantum</option>
                <option value="Imaginary">Imaginary</option>
              </select>
              <br /> 
              <br/>

              <label htmlFor="hp">Hp: </label>
              <input type="number" id="hp" name="hp" min={min} max={200} value={character.hp} onChange={handleChange} />
              <br/>

              <label htmlFor="atk">Attack: </label>
              <input type="number" id="atk" name="atk" min={min} max={105} value={character.atk} onChange={handleChange} />
              <br/>

              <label htmlFor="def">Defense: </label>
              <input type="number" id="def" name="def" min={min} max={100} value={character.def} onChange={handleChange} />
              <br/>

              <label htmlFor="spd">Speed: </label>
              <input type="number" id="spd" name="spd" min={min} max={115} value={character.spd} onChange={handleChange} />
              <br/>
              <br/>

              <button className="deleteButton" onClick={deleteCharacter} >Delete</button>
              <input type="submit" value="Update" onClick={updateCharacter} />
            </form>
          </div>
        )
      :""}
    </div>
  )
}

export default EditCrew