const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (favorite, item) => {
        if(item.likes > favorite.likes){
            return item
        }
        return favorite
    }
    return blogs.length === 0 ? null : blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    
    const group = _.groupBy(blogs, 'author')
    const highestCount = Object.keys(group).map(author => {
        return {author, blogs: group[author]}
    }).sort((a, b) => {
        return b.blogs.length - a.blogs.length
    })
    //console.log(highestCount[0])
    return {author: highestCount[0].author, blogs: highestCount[0].blogs.length}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}