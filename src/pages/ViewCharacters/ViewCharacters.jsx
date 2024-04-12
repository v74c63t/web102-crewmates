import { useState, useEffect } from "react"
import { supabase } from "../../Client"
import './ViewCharacters.css'
import { Link } from "react-router-dom"
import CharacterCondensed from "../../components/CharacterCondensed/CharacterCondensed"
import {
  Tooltip,
  PieChart,
  Pie
} from "recharts";

const ViewCharacters = () => {
  const [characters, setCharacters] = useState([])
  const [pathData, setPathData] = useState([])
  const [elementData, setElementData] = useState([])
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
    const fetchPathCount = async() => {
      const { data } = await supabase
                                  .from('crewmates')
                                  .select('path, id.count()')
      setPathData(data)
    }
    const fetchElementCount = async() => {
      const { data } = await supabase
                                  .from('crewmates')
                                  .select('element, id.count()')
      setElementData(data)
    }
    fetchCharacters()
    fetchPathCount()
    fetchElementCount()
  }, [])


  return (
    <div>
      <div className="view">
        <h2 className="view-header">Gallery</h2>
        {
          characters !== null && characters.length > 0 ? (
            <div className="data">
              <h2 className="summary-header">Summary Stats</h2>
              <div className="charts">
                <div className="chart">
                  <div className="label">Number of Characters by Path</div>
                  <PieChart width={320} height={240}>
                    <Pie data={pathData} dataKey="count" nameKey="path" cx="50%" cy="50%" outerRadius={80} fill="#D1B2E8" />
                    <Tooltip />
                  </PieChart>
                </div>
                <div className="chart">
                  <div className="label">Number of Characters by Element</div>
                  <PieChart width={320} height={240}>
                    <Pie data={elementData} dataKey="count" nameKey="element" cx="50%" cy="50%" outerRadius={80} fill="#D1B2E8" />
                    <Tooltip />
                  </PieChart>
                </div>
              </div>
              <h2 className="character-header">Characters</h2>
              {
                characters.map((character, i) => {
                  return (
                    <CharacterCondensed key={i} character={character} />
                  )
                })
              }
            </div>
          ) : <h4 className="view-message">{message}</h4>
        }
        {message === 'No Characters Yet' ? (
          <div>
            <img src="https://pbs.twimg.com/media/GAkIhvGXsAA12Xh.png" alt="march" width={200} height={200} />
            <h4 className="view-message">
              Get started by heading over to the <Link className="create-link" to="/create">Create a Character page!</Link>
            </h4>
          </div>
        ): ""}
      </div>
    </div>
  )
}

export default ViewCharacters