import Router from 'koa-router'
import { get, getju } from '../app/controlers/weapon'
import { houtai, deletes } from '../app/controlers/admin'

export const router = app => {
    const router = new Router()

    router.get('/', get)
    router.get('/post/:id', getju)

    router.get('/admin/post', houtai)
    router.get('/admin/post/delete:id', deletes)

    app.use(router.routes())
    app.use(router.allowedMethods())
}