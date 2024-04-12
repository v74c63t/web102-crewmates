import { useState, useEffect } from "react"
import { supabase } from "../../Client"
import './ReadCrew.css'
import { Link } from "react-router-dom"
import CharacterCondensed from "../../components/CharacterCondensed/CharacterCondensed"
import {
  Tooltip,
  PieChart,
  Pie,
  Legend
} from "recharts";

const ReadCrew = () => {
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
      if(message.length === 0) {
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
              <h2 className="summary-header">Summary Statistics</h2>
              <div className="charts">
                <div className="chart">
                  <div className="label">Number of Characters by Path</div>
                  <PieChart width={320} height={240}>
                    <Pie data={pathData} dataKey="count" nameKey="path" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" />
                    <Tooltip />
                  </PieChart>
                </div>
                <div className="chart">
                  <div className="label">Number of Characters by Element</div>
                  <PieChart width={320} height={240}>
                    <Pie data={elementData} dataKey="count" nameKey="element" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" />
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
          <h4 className="view-message">
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