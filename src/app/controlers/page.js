import mongoose from 'mongoose'
import truncate from 'truncate'
import moment from 'moment'

const Weapon = mongoose.model('Weapon')

export const home = async ctx => {
    try {
        ctx.state.moment = moment
        ctx.state.truncate = truncate
        let weapon = await Weapon.find()
        await ctx.render('page/home', {
            title: '恰鸡盒',
            weapons: weapon.slice(0,13)
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
        await ctx.render('page/persion', {
            title: '个人中心'
        })
    } catch (err) {
        console.log('个人中心出错', err)
    }
}

export const register = async ctx => {
    try {
        await ctx.render('page/register', {
            // title: '注册'
        })
    } catch (err) {
        console.log('注册出错', err)
    }
}
export const login = async ctx => {
    try {
        await ctx.render('page/login', {
            // title: '登录'
        })
    } catch (err) {
        console.log('登录出错', err)
    }
}