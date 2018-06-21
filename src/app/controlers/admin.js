import mongoose from 'mongoose'
import moment from 'moment'
import truncate from 'truncate'

const Post = mongoose.model('Post')
const User = mongoose.model('User')

export const adminindex = async ctx => {
    try {
        ctx.state.moment = moment
        ctx.state.truncate = truncate

        let post = await Post.find()
        let pageNum = Math.abs(parseInt(ctx.query.page || 1, 10))
        let pageSize = 10
        let totalCount = post.length
        let pageCount = Math.ceil(totalCount / pageSize)

        if (pageNum > pageCount) {
            pageNum = pageCount
        }
        await ctx.render('admin/admin', {
            title:'文章列表',
            posts: post.slice((pageNum - 1) * pageSize, pageSize * pageNum),
            pageNum: pageNum,
            pageCount: pageCount,
        })
    } catch (err) {
        console.log(`后台列表出错 ${err}`)
    }
}

export const addpost = async ctx => {
    try{
        await ctx.render('admin/add',{
            title: '添加文章',
            action: 'addpost',
            post: {}
        })
    }catch(err){
        console.log('添加文章出错', err)
    }
}

export const userlist = async ctx => {
    try {
        ctx.state.moment = moment
        let users = await User.find()
        await ctx.render('admin/userlist', {
            title: '用户列表',
            users: users
        })
    } catch (err) {
        console.log('用户列表出错', err)
    }
}

export const postadd = async ctx => {
    try {
        const opts = ctx.request.body
        let post = new Post(opts)
        let savepost = await post.save()
        console.log('文章成功保存', savepost)
        ctx.response.redirect('/admin/post')
    } catch (err) {
        console.log('添加文章出错', err)
    }
}

export const edit = async ctx => {
    try {
        const id = ctx.params.id
        let post = await Post.findOne({_id:id})
        await ctx.render('admin/add', {
            title: '添加文章',
            post: post
        })
    } catch (err) {
        console.log('编辑文章出错', err)
    }
}

export const deletes = async ctx => {
    await Post.remove({ _id: ctx.params.id})
    console.log('成功删除')
    ctx.response.redirect('/admin/post')
}

export const userup = async ctx => {
    const id = ctx.params.id
    const updates = { $set: { role: "管理员" } }
    let vipuser = await User.update({ _id: id }, updates)
    ctx.response.redirect('/admin/userlist')
}

export const userdown = async ctx => {
    const id = ctx.params.id
    const updates = { $set: { role: "普通用户" } }
    let vipuser = await User.update({ _id: id }, updates)
    ctx.response.redirect('/admin/userlist')
}