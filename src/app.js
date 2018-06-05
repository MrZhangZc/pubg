import Koa from 'koa'
import { router } from './router'

const app = new Koa()

router(app)

app.listen(5001, () => {
    console.log(`server Success on : 5001`)
})

