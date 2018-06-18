
import mongoose from 'mongoose'
import config from '../config'

require('../app/schema/resource')
require('../app/schema/weapon')
require('../app/schema/armor')
require('../app/schema/consumable')
require('../app/schema/user')

export const database = () => {
    mongoose.set('debug', true)

    mongoose.connect(config.dbUrl)

    mongoose.connection.on('disconnected', () => {
        mongoose.connect(config.dbUrl)
    })

    mongoose.connection.on('err', err => {
        console.log('连接数据库出错')
    })

    mongoose.connection.on('open', async () => {
        console.log('成功连接数据库：' + config.dbUrl)
    })
}