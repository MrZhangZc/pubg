import mongoose from 'mongoose'
//import multer from 'koa-multer'
import pApi from '../../pbugapi/api'

const User = mongoose.model('User')
// var storage = multer.diskStorage({
//     destination: 'images',
// })

// var upload = multer({
//     storage: storage,
// });
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

export const userinfo = async ctx => {
    try{
        const opts = ctx.request.body.user
        const user = new User(opts)
        console.log('新注册的用户',user)
        const saveInfo = await user.save() // 保存数据
        ctx.response.redirect('/login')
    }catch(err){
        console.log('注册出错',err)
    }
}

export const userlogin = async ctx => {
    try {
        let _user = ctx.request.body.user
        let name = _user.name
        let password = _user.password

        let zzc = await User.findOne({ name: name })
        console.log('找到了用户',zzc)
        if (!zzc) {
            console.log('该用户名不存在,请核对后再登录')
            ctx.response.redirect('/register')
        } else {
            let trueuser = await zzc.conparePassword(password)

            if (trueuser) {
                ctx.session.user = {
                    _id: zzc._id,
                    name: zzc.name,
                    role: zzc.role,
                    sex : zzc.sex
                }
                console.log('session中的用户', ctx.session)
                ctx.response.redirect('/')
            } else {
                console.log('出错啦')
                ctx.response.redirect('/register')
            }
        }
    } catch (err) {
        console.log('注册出错', err)
    }
}

export const logout = async ctx => {
    delete ctx.session.user
    delete ctx.state.user

    ctx.response.redirect('/')
}

export const uploadimg = async ctx => {
    // const file = ctx.request.body
    upload.single('file')
    ctx.body = {
        filename: ctx.req.file//返回文件名  
    }
    ctx.response.redirect('/')
}
export const pubgapi = async ctx => {
    try{
        let _user = ctx.session.user
        ctx.state.user = _user
        const nikename = ctx.request.body.nikename
        console.log(nikename)
        let userapi = new pApi()
        let nicknameplayer = await userapi.getPlayersInfo(nikename)
        // const player = nicknameplayer.data[0].attributes
        // const playerd = nicknameplayer.data[0].relationships
        const playerId = nicknameplayer.data[0].id
        console.log(playerId)
        let idplayer = await userapi.getPlayerbyId(playerId)
        // console.log('idplayer', idplayer)
        // let sesion = await userapi.getCurrentSeason()
        // console.log('现在的赛季是', sesion)
        let pstate = await userapi.getPlayerStats(playerId)
        const player = pstate.data.attributes.gameModeStats
        console.log('玩家状态是', pstate)
        console.log('玩家属性', pstate.data.attributes.gameModeStats)
        // console.log('玩家关系', pstate.data.relationships.matchesDuo)
        // console.log('玩家关系2', pstate.data.relationships.matchesDuoFPP)
        // console.log('玩家关系赛季', pstate.data.relationships.season)
        // console.log('玩家关系玩家', pstate.data.relationships.player)
        // console.log('玩家关系单排', pstate.data.relationships.matchesSolo)
        
        // console.log('属性', player)
        // console.log('关系', playerd)
        // console.log('数据', nicknameplayer)
        await ctx.render('page/exploits', {
            title: '战绩查询',
            idplayer: idplayer,
            player: player,
        })
        
    }catch(err){
        console.log('查询出错',err)
    }
}

export const pubgapip = async ctx => {
    try {
        let _user = ctx.session.user
        ctx.state.user = _user
        const nikename = ctx.request.body.nikename
        const autograph = ctx.request.body.autograph
        const sex = ctx.request.body.sex

        const userapi = new pApi()
        const nicknameplayer = await userapi.getPlayersInfo(nikename)
        const playerId = nicknameplayer.data[0].id
        const idplayer = await userapi.getPlayerbyId(playerId)
        const pstate = await userapi.getPlayerStats(playerId)
        const player = pstate.data.attributes.gameModeStats

        const gamename = idplayer.data.attributes.name
        const kills = player.solo.kills + player.duo.kills + player.squad.kills

        const updates = { $set: { gamename: gamename } }
        const updates2 = { $set: { rank: kills } }
        const updates3 = { $set: { autograph: autograph } }
        const updates4 = { $set: { sex: sex } }
        await User.update({ name: _user.name }, updates)
        await User.update({ name: _user.name }, updates2)
        await User.update({ name: _user.name }, updates3)
        await User.update({ name: _user.name }, updates4)

        let auser = await User.findOne({ name: _user.name })
        console.log(auser)
        await ctx.render('page/persion', {
            title: '战绩查询',
            idplayer: idplayer,
            player: player,
            auser: auser,
            kills: kills
        })

    } catch (err) {
        console.log('查询出错', err)
        ctx.response.redirect('/')
    }
}

export const signinRequired = async (ctx, next) => {
    let user = ctx.session.user
    if(user){
        await next()
    }else{
        ctx.redirect('/')
    }
}

export const adminRequired = async (ctx,next) => {
    let user = ctx.session.user
    if(user.role === '管理员'){
        await next()
    }else{
        ctx.redirect('/')
    }
}


