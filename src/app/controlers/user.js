import mongoose from 'mongoose'


const User = mongoose.model('User')

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

exports.logout = async ctx => {
    delete ctx.session.user
    delete ctx.state.user

    ctx.response.redirect('/')
}