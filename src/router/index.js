import Router from 'koa-router'
import { posts, post} from '../app/controlers/post'
import { adminindex, addpost, postadd, deletes, edit, userlist, userup, userdown } from '../app/controlers/admin'
import { home, exploits, equip, gamenews, persion} from '../app/controlers/page'
import { register, login, userinfo, userlogin, logout, uploadimg, pubgapi, signinRequired, adminRequired } from '../app/controlers/user'

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
    router.post('/uploadimg', uploadimg)

    //pubg
    router.post('/exploits', pubgapi)
    
    //post
    router.get('/posts', posts)
    router.get('/post/:id', post)

    //admin
    router.get('/admin/post', adminindex)
    router.get('/admin/post/add', addpost)
    router.post('/admin/post/addpost', postadd)
    router.get('/admin/post/delete/:id', deletes)
    router.get('/admin/post/edit/:id', edit)
    router.get('/admin/userlist', userlist)
    router.get('/admin/user/up/:id', userup)
    router.get('/admin/user/down/:id', userdown)

    //admin
    //router.get('/admin', adminindex)

    app.use(router.routes())
    app.use(router.allowedMethods())
}