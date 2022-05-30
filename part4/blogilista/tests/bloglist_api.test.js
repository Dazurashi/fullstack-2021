const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('identifying field is written id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('adding new blog', async () => {
    const newBlog= {
        title: 'How to pass bot tests',
        author: 'First robot author ever',
        url: 'www.fakewebsite.com'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).toContain('How to pass bot tests')
})

test('sure that likes-field has at least value 0', async() => {
    const newBlog= {
        title: 'How to pass bot tests',
        author: 'First robot author ever',
        url: 'www.fakewebsite.com'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
})

test('400 if no title or url', async () => {
    const newBlog = {likes: 7}
    console.log(newBlog)
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        
        
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('deleting blog gives status code 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).not.toContain(blogToDelete.title)
})

// test('updating likes of blog give 200', async () =>{
//     const blogsAtStart = await helper.blogsInDb()
//     const blogToUpdate = blogsAtStart[0]
//     console.log(blogsAtStart[0])
//     await api
//         .put(`/api/blogs${blogToUpdate.id}`)
//         .send({likes: 8})
//         .expect(200)
    
//     const blogsAtEnd = await helper.blogsInDb()
//     const updated = blogsAtEnd[0]
//     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
//     expect(updated.likes).toBe(8)
// })
  

test('can update a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const updatedBlog = blogsAtStart[0]
    updatedBlog.likes += 1

    await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updated = blogsAtEnd[0]
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(updated.likes).toBe(8)
  })

afterAll(() => {
    mongoose.connection.close()
})