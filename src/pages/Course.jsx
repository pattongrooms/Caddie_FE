import Client from '../services/api'
import { BASE_URL } from '../services/api'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Course = () => {
  const [formValues, setFormValues] = useState({
    courseName: '',
    city: '',
    state: '',
    par: ''
  })
  const [courses, setCourses] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let response = await Client.post('/courses/new', formValues)
    setCourses([...courses, response.data])
    setFormValues({ courseName: '', city: '', state: '', par: '' })
    // response.data is new object
  }

  const handleCourseNameChange = (e) => {
    setFormValues({ ...formValues, courseName: e.target.value })
  }
  const handleCityChange = (e) => {
    setFormValues({ ...formValues, city: e.target.value })
  }
  const handleStateChange = (e) => {
    setFormValues({ ...formValues, state: e.target.value })
  }
  const handleParChange = (e) => {
    setFormValues({ ...formValues, par: e.target.value })
  }

  useEffect(() => {
    const getCourses = async () => {
      try {
        let response = await axios.get(`${BASE_URL}/courses/all`)
        if (response && response.data) {
          console.log(response.data)
          setCourses(response.data)
        } else {
          console.log('server error')
        }
      } catch (error) {
        console.error(error)
      }
    }
    getCourses()
  }, [])

  const handleDelete = async (id) => {
    await Client.delete(`/courses/${id}`)
    setCourses(courses.filter((course) => course._id !== id))
  }

  return (
    <div className="course-container">
      <div className="blog-card">
        <h1>Courses</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Course Name"
            onChange={handleCourseNameChange}
            value={formValues.courseName}
          />
          <input
            placeholder="City"
            onChange={handleCityChange}
            value={formValues.city}
          />
          <input
            placeholder="State"
            onChange={handleStateChange}
            value={formValues.state}
          />
          <input
            placeholder="Course Par"
            onChange={handleParChange}
            value={formValues.par}
          />
          <button type="submit">Add Course</button>
        </form>
      </div>
      <section className="new-blog-card">
        {courses.map((course) => (
          <div key={course._id} className="blog-post-card">
            <h4>
              {course.courseName} {course.city} {course.state} {course.par}
            </h4>
            <button onClick={() => handleDelete(course._id)}>
              Delete Course
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Course
