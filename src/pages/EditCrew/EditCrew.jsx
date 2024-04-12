import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './EditCrew.css'
import { supabase } from "../../Client";


const EditCrew = () => {

  const {id} = useParams()
  const [hpMin, setHpMin] = useState(100)
  const [atkMin, setAtkMin] = useState(60)
  const [defMin, setDefMin] = useState(45)
  const [spdMin, setSpdMin] = useState(90)
  const [hpMax, setHpMax] = useState(200)
  const [atkMax, setAtkMax] = useState(105)
  const [defMax, setDefMax] = useState(100)
  const [spdMax, setSpdMax] = useState(115)
  // const [max, setMax] = useState(200)

  const [character, setCharacter] = useState(null)

  useEffect(() => {
    const getCharacter = async () => {
      const {data} = await supabase
                          .from('crewmates')
                          .select()
                          .eq('id', id)
      setCharacter(data[0])
      if(data[0].path === 'Abundance') {
        setHpMin(144)
      }
      else if(data[0].path === 'Hunt') {
        setSpdMin(100)
      }
      else if(data[0].path === 'Preservation') {
        setHpMin(144)
        setDefMin(78)
      }
      else if(data[0].path === 'Destruction') {
        setAtkMin(73)
      }
    }
    getCharacter()
  }, [id])

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
    if(
      (character.hp >= hpMin && character.hp <= hpMax) && 
      (character.atk >= atkMin && character.atk <= atkMax) &&
      (character.def >= defMin && character.def <= defMax) &&
      (character.spd >= spdMin && character.spd <= spdMax) 
    )
    {
      await supabase
          .from('crewmates')
          .update(character)
          .eq('id', id);
      window.location.replace('/')
    }
    else {
      alert("Please make sure all the inputted stats are within the range of the min and max values listed for each stat.")
    }
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
            <form className="form">
              <h1>Update a Character</h1>
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
                <button className="btn" onClick={deleteCharacter} >Delete</button>
                <input type="submit" value="Update" onClick={updateCharacter} className="btn"  />
              </div>
            </form>
          </div>
        )
      :""}
    </div>
  )
}

export default EditCrew