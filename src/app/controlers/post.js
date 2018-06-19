import mongoose from 'mongoose'
import truncate from 'truncate'
import slug from 'slug'

const Post = mongoose.model('Post')

export const posts = async ctx => {
    try {
        ctx.state.truncate = truncate
        ctx.state.slug = slug
        let post = await Post.find()
        //console.log(post)

        let pageNum = Math.abs(parseInt(ctx.query.page || 1, 10))
        let pageSize = 10
        let totalCount = post.length
        let pageCount = Math.ceil(totalCount / pageSize)

        if (pageNum > pageCount) {
            pageNum = pageCount
        }
        await ctx.render('page/posts', {
            title: '文章列表',
            posts: post.slice((pageNum - 1) * pageSize, pageSize * pageNum),
            pageNum: pageNum,
            pageCount: pageCount
        })
    } catch (err) {
        console.log(`查找资讯出错 ${err}`)
    }
}

export const post = async ctx => {
    //let id = ctx.params.id
    //console.log(id)
    var conditions = {};

    try {
        conditions._id = mongoose.Types.ObjectId(ctx.params.id)
    } catch (err) {
        conditions.slug = ctx.params.id
    }
    //console.log('2222222222',conditions)

    let post = await Post.findById(conditions)
    console.log('1111111111111', post)
    await ctx.render('page/post', {
        title: '文章详情',
        post: post
    })
}