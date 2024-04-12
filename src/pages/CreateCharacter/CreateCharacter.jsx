import { useState } from "react"
import { supabase } from "../../Client"
import './CreateCharacter.css'

const CreateCharacter = () => {

  const [hpMin, setHpMin] = useState(144)
  const [atkMin, setAtkMin] = useState(60)
  const [defMin, setDefMin] = useState(78)
  const [spdMin, setSpdMin] = useState(90)
  const [hpMax, setHpMax] = useState(200)
  const [atkMax, setAtkMax] = useState(105)
  const [defMax, setDefMax] = useState(100)
  const [spdMax, setSpdMax] = useState(115)

  const [character, setCharacter] = useState({'name': "", 'path': "Preservation", 'element': "Ice", 'atk': atkMin, 'spd': spdMin, 'hp': hpMin, 'def': defMin})

  const resetStats = () => {
    setHpMin(100)
    setAtkMin(60)
    setDefMin(45)
    setSpdMin(90)
    // setCharacter( (prev) => {
    //   return {
    //       ...prev,
    //       'hp':100,
    //       'atk': 60,
    //       'def': 45,
    //       'spd': 90,
    //   }
    // })
  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    if(name === 'path') {
      resetStats()
      if(value === 'Abundance') {
        setHpMin(144)
        if(character.hp < 144) {
          setCharacter( (prev) => {
            return {
                ...prev,
                'hp':144,
            }
          })
        }
      }
      else if(value === 'Hunt') {
        setSpdMin(100)
        if(character.spd < 100) {
          setCharacter( (prev) => {
            return {
                ...prev,
                'spd':100,
            }
          })
        }
      }
      else if(value === 'Preservation') {
        setHpMin(144)
        setDefMin(78)
        if(character.hp < 144) {
          setCharacter( (prev) => {
            return {
                ...prev,
                'hp':144,
            }
          })
        }
        if(character.def < 78) {
          setCharacter( (prev) => {
            return {
                ...prev,
                'def':78,
            }
          })
        }
      }
      else if(value === 'Destruction') {
        setAtkMin(73)
        if(character.atk < 73) {
          setCharacter( (prev) => {
            return {
                ...prev,
                'atk':73,
            }
          })
        }
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
    if(
        (character.hp >= hpMin && character.hp <= hpMax) && 
        (character.atk >= atkMin && character.atk <= atkMax) &&
        (character.def >= defMin && character.def <= defMax) &&
        (character.spd >= spdMin && character.spd <= spdMax) 
      )
    {
      await supabase
          .from('crewmates')
          .insert(character)
          .select()
      window.location.replace('/')
    }
    else {
      alert("Please make sure all the inputted stats are within the range of the min and max values listed for each stat.")
    }

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
            <label htmlFor="hp">Hp({hpMin}-{hpMax}): </label>
            <input type="number" id="hp" name="hp" min={hpMin} max={hpMax} value={character.hp} onChange={handleChange} />
          </div>
          {/* <br/> */}

          <div>
            <label htmlFor="atk">Attack({atkMin}-{atkMax}): </label>
            <input type="number" id="atk" name="atk" min={atkMin} max={atkMax} value={character.atk} onChange={handleChange} />
          </div>
          {/* <br/> */}

          <div>
            <label htmlFor="def">Defense({defMin}-{defMax}): </label>
            <input type="number" id="def" name="def" min={defMin} max={defMax} value={character.def} onChange={handleChange} />
          </div>
          {/* <br/> */}

          <div>
            <label htmlFor="spd">Speed({spdMin}-{spdMax}): </label>
            <input type="number" id="spd" name="spd" min={spdMin} max={spdMax} value={character.spd} onChange={handleChange} />
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

export default CreateCharacter