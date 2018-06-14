
import mongoose from 'mongoose'
import config from '../config'
import loremIpsum from 'lorem-ipsum'

// require('../app/schema/resource')
require('../app/schema/weapon')
// require('../app/schema/armor')
// require('../app/schema/consumable')

require('../app/controlers/information')

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

database()

const Resource = mongoose.model('Resource')
const Weapon = mongoose.model('Weapon')
const Armor = mongoose.model('Armor')
const Consumable = mongoose.model('Consumable')

// async function savaData () {
//     const resource = await Resource.find()

//     for(let i = 0;i < 35; i++){
//         let weapon = new Weapon({
//             name: loremIpsum({ count: 1, units: 'sentences'  }),
//             bullet: loremIpsum({ count: 20, units: 'sentences' })
//         })

//         await weapon.save()
//     }

// }

// savaData()

async function zzc(){
    try {
        let weapon = await Weapon.find({})

        weapon.splice(0,2)

        console.log(weapon)
    } catch (err) {
        console.log(`查找武器出错 ${err}`)
    }
}

zzc()