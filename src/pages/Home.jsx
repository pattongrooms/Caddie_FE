import { useNavigate } from 'react-router-dom'

const Home = () => {
  let navigate = useNavigate()

  return (
    <div className="home-container col">
      <section className="welcome-signin">
        <button onClick={() => navigate('/course')}>
          Click Here To Get Started
        </button>
      </section>
    </div>
  )
}

export default Home
