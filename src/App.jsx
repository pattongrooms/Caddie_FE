import { CheckSession } from './services/Auth'
import { Route, Routes } from 'react-router'
import { useState, useEffect } from 'react'
import Register from './pages/Register'
import SignIn from './pages/Signin'
import Nav from './components/Nav'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Course from './pages/Course'
import Tour from './pages/Tour'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)

  const [themeMode, setThemeMode] = useState('light')

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(themeMode)
  }, [themeMode])

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setThemeMode(storedTheme)
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  return (
    <div className={`App ${themeMode}`}>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        {/* <button className="darkButton" onClick={toggleTheme}>
          Light/Dark Mode
        </button> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog" element={<Blog user={user} />} />
          <Route path="/course" element={<Course />} />
          <Route path="/tour" element={<Tour />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
