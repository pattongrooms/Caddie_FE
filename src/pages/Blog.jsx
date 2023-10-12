import Client from '../services/api'
import { BASE_URL } from '../services/api'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Blog = (props) => {
  console.log(props)
  if (props.user === null) {
    return 'Loading Page'
  }
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    user: props.user.id
  })
  const [editContent, setEditContent] = useState('')
  const [blogs, setBlogs] = useState([])
  const [editingBlog, setEditBlog] = useState(null)

  const [toggle, setToggle] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    let response = await Client.post('/blogs/new', formValues)
    console.log(response)
    setToggle((prevToggle) => (prevToggle = !prevToggle))
    setFormValues({ title: '', content: '', user: props.user.id })
  }
  console.log(blogs)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const getBlogs = async () => {
      let response = await axios.get(`${BASE_URL}/blogs/all`)
      setBlogs(response.data)
    }
    getBlogs()
  }, [toggle])

  const handleChangeEdit = (e) => {
    setEditContent(e.target.value)
  }

  const handleEdit = (id) => {
    const blogEdit = blogs.find((blog) => blog._id === id)
    setEditBlog(id)
    setEditContent(blogEdit.content)
  }

  const handleUpdate = async (id) => {
    const updatedBlog = {
      ...blogs.find((blog) => blog._id === id),
      content: editContent
    }
    await Client.put(`/blogs/${id}`, updatedBlog)
    setBlogs(blogs.map((blog) => (blog._id === id ? updatedBlog : blog)))
    setEditBlog(null)
    setEditContent('')
  }

  const handleDelete = async (id) => {
    await Client.delete(`/blogs/${id}`)
    setBlogs(blogs.filter((blog) => blog._id !== id))
  }

  const blogPostReverse = blogs
    .slice()
    .reverse()
    .map((blog) => (
      <div key={blog._id} className="blog-post-card">
        <h4>{blog.title}</h4>
        <h4>{blog.content}</h4>
        {props.user?.id === blog.user && (
          <>
            <button onClick={() => handleDelete(blog._id)}>Delete</button>
            <button onClick={() => handleEdit(blog._id)}>Edit</button>
          </>
        )}
        {editingBlog === blog._id && (
          <div>
            <input
              placeholder="Edit Blog"
              onChange={handleChangeEdit}
              value={editContent}
            />
            <button onClick={() => handleUpdate(blog._id)}>Update Blog</button>
          </div>
        )}
      </div>
    ))
  return (
    <div className="feed-container">
      <div className="blog-card">
        <h1>How was your round?</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="title"
            name="title"
            onChange={handleChange}
            value={formValues.title}
          />
          <input
            placeholder="content"
            name="content"
            onChange={handleChange}
            value={formValues.content}
          />
          <button type="submit">Send It</button>
        </form>
      </div>
      <section className="new-blog-card">{blogPostReverse}</section>
    </div>
  )
}

export default Blog
