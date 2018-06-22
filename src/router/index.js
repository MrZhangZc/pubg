import Router from 'koa-router'
import { posts, post} from '../app/controlers/post'
import { adminindex, addpost, postadd, deletes, edit, userlist, userup, userdown } from '../app/controlers/admin'
import { armor, consumable, parts, sniperrifle, rifle, shotgun, submachinegun, miscellaneous, pistol, closeweapon, investment } from '../app/controlers/weapon'
import { home, exploits, equip, forum, oneforum, addforum, addforumpost, comment, persion} from '../app/controlers/page'
import { register, login, userinfo, userlogin, logout, uploadimg, pubgapi, pubgapip, signinRequired, adminRequired, allinfoRequired } from '../app/controlers/user'

export const router = app => {
    const router = new Router()
    
    //page
    router.get('/', home)
    router.get('/exploits', exploits)
    router.get('/equip', equip)
    router.get('/forum', forum) 
    router.get('/detailspost/:id', oneforum)
    router.get('/forum/add', signinRequired, allinfoRequired,addforum)
    router.post("/forum/add", addforumpost)
    router.post("/forum/comment/:id", comment)
    router.get('/persion', persion)
    //weapon
    router.get('/armor', armor)
    router.get('/consumable', consumable)
    router.get('/parts', parts)
    router.get('/sniperrifle', sniperrifle)
    router.get('/rifle', rifle)
    router.get('/submachinegun', submachinegun)
    router.get('/miscellaneous', miscellaneous)
    router.get('/pistol', pistol)
    router.get('/shotgun', shotgun)
    router.get('/closeweapon', closeweapon)
    router.get('/investment', investment)

    //user
    router.get('/register', register)
    router.get('/login', login)
    router.post('/admin/user/register', userinfo)
    router.post('/login', userlogin)
    router.get('/logout', logout)
    router.post('/uploadimg', uploadimg)

    //pubg
    router.post('/exploits', pubgapi)
    router.post('/persion', pubgapip)
    
    //post
    router.get('/posts', posts)
    router.get('/post/:id', post)

    //admin
    router.get('/admin/post', signinRequired, adminRequired, adminindex)
    router.get('/admin/post/add', signinRequired, adminRequired, addpost)
    router.post('/admin/post/addpost', signinRequired, adminRequired, postadd)
    router.get('/admin/post/delete/:id', signinRequired, adminRequired, deletes)
    router.get('/admin/post/edit/:id', signinRequired, adminRequired, edit)
    router.get('/admin/userlist', signinRequired, adminRequired, userlist)
    router.get('/admin/user/up/:id', signinRequired, adminRequired, userup)
    router.get('/admin/user/down/:id', signinRequired, adminRequired, userdown)

    //admin
    //router.get('/admin', adminindex)

    app.use(router.routes())
    app.use(router.allowedMethods())
}