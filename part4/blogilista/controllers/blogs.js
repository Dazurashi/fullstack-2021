const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
    if (!request.body.hasOwnProperty('title')) {
        return response.status(400).json({error: 'no title'})
    }
    if (!request.body.hasOwnProperty('url')) {
        return response.status(400).json({error: 'no url'})
    }
    const body = request.body
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes}
        
    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    if(updated) {
        response.status(200).json(updated.toJSON())
    }else {
        response.status(404).end()
    }
})

module.exports = blogsRouter