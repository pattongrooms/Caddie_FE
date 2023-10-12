import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const Tour = () => {
  const [rankings, setRankings] = useState([])

  useEffect(() => {
    const getRankList = async () => {
      let response = await axios.get(`${BASE_URL}/tours/all`)
      setRankings(response.data)
    }
    getRankList()
  }, [])

  return (
    <div className="tour-container">
      <h2>PGA Tour Info Page</h2>
      <div className="tour-list">
        {rankings.length ? (
          <ol>
            {rankings.map((player) => (
              <li key={player.playerId}>{player.name}</li>
            ))}
          </ol>
        ) : (
          <h3>Retrieving the Most Up to Date Rankings. . . </h3>
        )}
      </div>
    </div>
  )
}

export default Tour
