import mongoose from 'mongoose'

const Weapon = mongoose.model('Weapon')

export const houtai = async ctx => {
    try {

        let sortby = ctx.query.sortby ? ctx.query.sortby : 'name'
        let sortdir = ctx.query.sortdir ? ctx.query.sortdir : 'desc' 
        console.log(sortby, sortdir)

        let sortObj = {}
        sortObj[sortby] = sortdir
        console.log(sortObj)

        let weapon = await Weapon.find().sort(sortObj)
        //console.log(weapon)

        let pageNum = Math.abs(parseInt(ctx.query.page || 1, 10))
        let pageSize = 10
        let totalCount = weapon.length
        let pageCount = Math.ceil(totalCount / pageSize)

        if (pageNum > pageCount) {
            pageNum = pageCount
        }
        await ctx.render('admin/index', {
            weapons: weapon.slice((pageNum - 1) * pageSize, pageSize * pageNum),
            pageNum: pageNum,
            pageCount: pageCount,
            sortby: sortby,
            sortdir: sortdir
        })
    } catch (err) {
        console.log(`后台列表出错 ${err}`)
    }
}

export const deletes = async ctx => {
    console.log(ctx.params.id)
    await Weapon.remove({ _id: ctx.params.id})
    console.log('成功删除')
    ctx.response.redirect('/admin/post')
}