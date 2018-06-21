import mongoose from 'mongoose'
import truncate from 'truncate'
import moment from 'moment'

const Post = mongoose.model('Post')
const User = mongoose.model('User')
const Forum = mongoose.model('Forum')

export const home = async ctx => {
    try {
        console.log('user in session')
        console.log(ctx.session.user)
        let _user = ctx.session.user
        ctx.state.user = _user
        ctx.state.moment = moment
        ctx.state.truncate = truncate
        let post = await Post.find()
        await ctx.render('page/home', {
            title: '恰鸡盒',
            posts: post.slice(0,13)
        })
    }catch(err){
        console.log('首页资讯列表出错', err)
    }
}

export const exploits = async ctx => {
    try{
        let _user = ctx.session.user
        ctx.state.user = _user
        await ctx.render('page/exploits',{
            title:'战绩查询'
        })
    }catch(err){
        console.log('战绩查询出错', err)
    }
}

export const equip = async ctx => {
    try {
        let _user = ctx.session.user
        ctx.state.user = _user
        await ctx.render('page/equip', {
            title: '武器装备'
        })
    } catch (err) {
        console.log('武器装备出错', err)
    }
}

export const forum = async ctx => {
    try {
        let _user = ctx.session.user
        ctx.state.user = _user
        ctx.state.moment = moment
        ctx.state.truncate = truncate
        let forums = await Forum.find().populate('author').sort({ '_id': -1 })
        await ctx.render('page/forum', {
            title: '游戏论坛',
            forums: forums
        })
    } catch (err) {
        console.log('游戏论坛出错', err)
    }
}

export const oneforum = async ctx => {
    try {
        let _user = ctx.session.user
        ctx.state.user = _user
        let id = ctx.params.id
        let user = await User.findOne({ _id: _user._id })
        if (user.sex == '女'){
            const update = { $set: { headimg: "/images/girl.jpg" } }
            let girl = await User.update({ _id: _user._id }, update)
        }
        let forum = await Forum.findOne({ _id: id }).populate('author')
        console.log(forum)
        await ctx.render('page/aforum', {
            title: '帖子详情',
            forum: forum
        })
    } catch (err) {
        console.log('帖子详情出错', err)
    }
}

export const comment = async ctx => {
    try {
        let _user = ctx.session.user
        ctx.state.user = _user
        let auser = await User.findOne({_id:_user._id})
        console.log(auser)
        let content = ctx.request.body.content
        let id = ctx.params.id
        let forum = await Forum.findOne({ _id: id }).populate('author')
        let newcomment = {
            content: content,
            from: auser
        }
        forum.comments.unshift(newcomment)
        forum.markModified('comments')
        await forum.save()
        await ctx.render('page/aforum', {
            title: '帖子详情',
            forum: forum,
            auser: auser
        })
    } catch (err) {
        console.log('帖子详情出错', err)
    }
}
export const addforum = async ctx => {
    try {
        let _user = ctx.session.user
        ctx.state.user = _user
        await ctx.render('page/addforum', {
            title: '发帖',
            forum: forum
        })
    } catch (err) {
        console.log('帖子详情出错', err)
    }
}

export const addforumpost = async ctx => {
    try {
        let _user = ctx.session.user
        ctx.state.user = _user
        let opts = ctx.request.body
        let title = opts.title
        let content = opts.content
        const forum = new Forum({
            title: title,
            content: content,
            author: _user._id
        })
        const saveInfo = await forum.save()
        console.log(_user)
        ctx.response.redirect('/forum')
    } catch (err) {
        console.log('添加帖子出错', err)
    }
}

export const persion = async ctx => {
    try {
        let _user = ctx.session.user
        ctx.state.user = _user
        let auser = await User.findOne({name: _user.name})
        await ctx.render('page/persion', {
            title: '个人中心',
            auser: auser
        })
    } catch (err) {
        console.log('个人中心出错', err)
        await ctx.render('page/persion', {
            title: '个人中心'
        })
    }
}

