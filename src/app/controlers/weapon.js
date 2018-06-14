import mongoose from 'mongoose'
// import truncate from 'truncate'
// import slug from 'slug'

// const Weapon = mongoose.model('Weapon')

// export const get = async ctx => {
//     try{
//         ctx.state.truncate = truncate
//         ctx.state.slug = slug
//         let weapon = await Weapon.find()
//         //console.log(weapon)

//         let pageNum = Math.abs(parseInt(ctx.query.page || 1,10))
//         let pageSize = 10
//         let totalCount = weapon.length
//         let pageCount = Math.ceil(totalCount / pageSize)

//         if (pageNum > pageCount) {
//             pageNum = pageCount
//         }
//         await ctx.render('index', {
//             weapons: weapon.slice((pageNum - 1) * pageSize, pageSize * pageNum),
//             pageNum : pageNum,
//             pageCount : pageCount
//         })
//     }catch (err) {
//         console.log(`查找武器出错 ${err}`)
//     }
// }

// export const getju = async ctx => {
//     //let id = ctx.params.id
//     //console.log(id)
//     var conditions = {};

//     try {
//         conditions._id = mongoose.Types.ObjectId(ctx.params.id)
//     } catch (err) {
//         conditions.slug = ctx.params.id
//     }
//     //console.log('2222222222',conditions)
    
//     let weapon = await Weapon.findById(conditions)
//     console.log('1111111111111',weapon)
//     await ctx.render('juti', {
//         title: '详情页',
//         weapon: weapon
//     })
// }