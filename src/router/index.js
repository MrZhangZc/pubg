import Router from 'koa-router'
import { getinformation, oneInformation } from '../app/controlers/information'
// import { houtai, deletes } from '../app/controlers/admin'
import { home, exploits, equip, gamenews, persion} from '../app/controlers/page'
import { register, login, userinfo, userlogin, logout } from '../app/controlers/user'

export const router = app => {
    const router = new Router()

    //page
    router.get('/', home)
    router.get('/exploits', exploits)
    router.get('/equip', equip)
    router.get('/gamenews', gamenews)
    router.get('/persion', persion)

    //user
    router.get('/register', register)
    router.get('/login', login)
    router.post('/admin/user/register', userinfo)
    router.post('/admin/user/login', userlogin)
    router.get('/logout', logout)
    

    router.get('/information', getinformation)
    router.get('/information/:id', oneInformation)
    // router.get('/admin/post', houtai)
    // router.get('/admin/post/delete:id', deletes)

    app.use(router.routes())
    app.use(router.allowedMethods())
}