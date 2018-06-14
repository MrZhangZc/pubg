import Router from 'koa-router'
import { getinformation, oneInformation } from '../app/controlers/information'
// import { houtai, deletes } from '../app/controlers/admin'
import { home } from '../app/controlers/page'

export const router = app => {
    const router = new Router()

    router.get('/', home)
    router.get('/information', getinformation)
    router.get('/information/:id', oneInformation)

    // router.get('/admin/post', houtai)
    // router.get('/admin/post/delete:id', deletes)

    app.use(router.routes())
    app.use(router.allowedMethods())
}