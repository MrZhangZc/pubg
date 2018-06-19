import mongoose from 'mongoose'
import truncate from 'truncate'
import moment from 'moment'

const Post = mongoose.model('Post')

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
        await ctx.render('page/exploits',{
            title:'战绩查询'
        })
    }catch(err){
        console.log('战绩查询出错', err)
    }
}

export const equip = async ctx => {
    try {
        await ctx.render('page/equip', {
            title: '武器装备'
        })
    } catch (err) {
        console.log('武器装备出错', err)
    }
}

export const gamenews = async ctx => {
    try {
        await ctx.render('page/gamenews', {
            title: '游戏新闻'
        })
    } catch (err) {
        console.log('游戏新闻出错', err)
    }
}

export const persion = async ctx => {
    try {
        let _user = ctx.session.user
        ctx.state.user = _user
        await ctx.render('page/persion', {
            title: '个人中心'
        })
    } catch (err) {
        console.log('个人中心出错', err)
    }
}

