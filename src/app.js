import Koa from 'koa'
import KoaViews from 'koa-views'
import KoaStatic from 'koa-static'
import bodyparser from 'koa-bodyparser'
import session from 'koa-session'
import { join } from 'path'
import { database } from './database'
import { router } from './router'

const PORT = process.env.PORT || '5001'
const HOST = process.env.HOST || '127.0.0.1'
const r = path => join(__dirname, path)

database()

const app = new Koa()

app.use(bodyparser())
app.keys = ['pubg']
const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false
}
app.use(session(CONFIG, app))

app.use(KoaStatic(r('../static')))
app.use(KoaViews(r('./app/views'), {
    extension: 'pug'
}))

router(app)

app.listen(PORT, HOST, () => {
    console.log(`server Success on : ${HOST} : ${PORT}`)
})