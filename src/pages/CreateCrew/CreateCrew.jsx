import { useState } from "react"
import { supabase } from "../../Client"
import './CreateCrew.css'

const CreateCrew = () => {

  const [hpMin, setHpMin] = useState(100)
  const [atkMin, setAtkMin] = useState(60)
  const [defMin, setDefMin] = useState(45)
  const [spdMin, setSpdMin] = useState(90)
  // const [max, setMax] = useState(200)

  const [character, setCharacter] = useState({'name': "", 'path': "Preservation", 'element': "Ice", 'atk': atkMin, 'spd': spdMin, 'hp': hpMin, 'def': defMin})

  const resetStats = () => {
    setHpMin(100)
    setAtkMin(60)
    setDefMin(45)
    setSpdMin(90)
    setCharacter( (prev) => {
      return {
          ...prev,
          'hp':100,
          'atk': 60,
          'def': 45,
          'spd': 90,
      }
    })
  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    if(name === 'path') {
      resetStats()
      if(value === 'Abundance') {
        setHpMin(144)
        setCharacter( (prev) => {
          return {
              ...prev,
              'hp':144,
          }
        })
      }
      else if(value === 'Hunt') {
        setSpdMin(100)
        setCharacter( (prev) => {
          return {
              ...prev,
              'spd':100,
          }
        })
      }
      else if(value === 'Preservation') {
        setHpMin(144)
        setDefMin(78)
        setCharacter( (prev) => {
          return {
              ...prev,
              'hp':144,
              'def': 78,
          }
        })
      }
      else if(value === 'Destruction') {
        setAtkMin(73)
        setCharacter( (prev) => {
          return {
              ...prev,
              'atk':73,
          }
        })
      }
    }
    setCharacter( (prev) => {
        return {
            ...prev,
            [name]:value,
        }
    })
  }

  const createCharacter = async(event) => {
    event.preventDefault()
    await supabase
          .from('crewmates')
          .insert(character)
          .select()
    window.location.replace('/')

  }

  const handleReset = (event) => {
    event.preventDefault()
    setCharacter((prev) => {
      return {
          ...prev,
        'name': "",
        'path': "Preservation",
        'element': "Ice",
      }
    })
    resetStats()
    // setMax(200)
  }

  return (
    <div>
      <div className="create">
        <form className="form">
          <h1>Create a Character</h1>
          <div>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" value={character.name} onChange={handleChange} />
          </div>
          {/* <br />
          <br/> */}

          <div>
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
          </div>
          {/* <br /> 
          <br/> */}

          <div>
            <label htmlFor="path">Path: </label>
            <select name="path" id="path" value={character.path} onChange={handleChange}>
              <option value="Preservation">Preservation</option>
              <option value="Destruction">Destruction</option>
              <option value="Hunt">Hunt</option>
              <option value="Erudition">Erudition</option>
              <option value="Harmony">Harmony</option>
              <option value="Nihility">Nihility</option>
              <option value="Abundance">Abundance</option>
            </select>
          </div>
          {/* <br /> 
          <br/>  */}

          <div>
            <label htmlFor="hp">Hp: </label>
            <input type="number" id="hp" name="hp" min={hpMin} max={200} value={character.hp} onChange={handleChange} />
          </div>
          {/* <br/> */}

          <div>
            <label htmlFor="atk">Attack: </label>
            <input type="number" id="atk" name="atk" min={atkMin} max={105} value={character.atk} onChange={handleChange} />
          </div>
          {/* <br/> */}

          <div>
            <label htmlFor="def">Defense: </label>
            <input type="number" id="def" name="def" min={defMin} max={100} value={character.def} onChange={handleChange} />
          </div>
          {/* <br/> */}

          <div>
            <label htmlFor="spd">Speed: </label>
            <input type="number" id="spd" name="spd" min={spdMin} max={115} value={character.spd} onChange={handleChange} />
          </div>
          {/* <br/>
          <br/> */}

          <div>
            <button onClick={handleReset} className="btn">Reset</button>
            <input type="submit" value="Submit" onClick={createCharacter} className="btn" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCrew