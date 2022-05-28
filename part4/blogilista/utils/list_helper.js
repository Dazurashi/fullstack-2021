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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}