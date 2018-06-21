import mongoose from 'mongoose'
import truncate from 'truncate'
import moment from 'moment'

const Post = mongoose.model('Post')
const User = mongoose.model('User')

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
        await ctx.render('page/forum', {
            title: '游戏论坛'
        })
    } catch (err) {
        console.log('游戏论坛出错', err)
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

