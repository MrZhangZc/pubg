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
        console.log(opts)
        const user = new User(opts)
        console.log('新注册的用户',user)
        const saveInfo = await user.save() // 保存数据
        console.log('22222',saveInfo)
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
        console.log(_user)

        let zzc = await User.findOne({ name: name })
        console.log('找到了用户',zzc)
        if (!zzc) {
            console.log('该用户名不存在,请核对后再登录')
            ctx.response.redirect('/register')
        } else {
            let trueuser = await zzc.conparePassword(password)
            console.log('对比完的用户',trueuser)

            if (trueuser) {
                ctx.session.user = {
                    _id: zzc._id,
                    name: zzc.name,
                    role: zzc.role
                }
                console.log('session中的用户', ctx.session)
                console.log(zzc)
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
    // console.log(file)
    upload.single('file')
    ctx.body = {
        filename: ctx.req.file//返回文件名  
    }
    console.log('weqweqwe', ctx.req.file)
    ctx.response.redirect('/')
}
export const pubgapi = async ctx => {
    try{
        const nikename = ctx.request.body.nikename
        console.log(nikename)
        let userapi = new pApi()
        let _puser = await userapi.getPlayersInfo(nikename)
        const player = _puser.data[0].attributes
        const playerd = _puser.data[0].relationships
        const playerId = _puser.data[0].id
        console.log(playerId)
        let idplayer = await userapi.getPlayerbyId(playerId)
        console.log('idplayer', idplayer)
        let sesion = await userapi.getCurrentSeason()
        console.log('现在的赛季是', sesion)
        let pstate = await userapi.getPlayerStats(playerId)
        console.log('玩家状态是', pstate)
        console.log('玩家属性', pstate.data.attributes.gameModeStats)
        console.log('玩家关系', pstate.data.relationships.matchesDuo)
        console.log('玩家关系2', pstate.data.relationships.matchesDuoFPP)
        console.log('玩家关系赛季', pstate.data.relationships.season)
        console.log('玩家关系玩家', pstate.data.relationships.player)
        console.log('玩家关系单排', pstate.data.relationships.matchesSolo)
        
        // console.log('属性', player)
        // console.log('关系', playerd)
        // console.log('数据', _puser)
        await ctx.render('page/exploits', {
            puser: player,
            playerd: playerd
        })
        
    }catch(err){
        console.log('查询出错',err)
    }
}


