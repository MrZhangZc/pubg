
export const armor = async ctx => {
    try {
        const weapens = [{ name: '头部防具', img: '/images/weapen/头盔.png' },
        { name: '防弹衣', img: '/images/weapen/防弹衣.png' },
        { name: '腰带', img: '/images/weapen/腰带.png' },
        { name: '吉利服', img: '/images/weapen/吉利服.png' },
        { name: '背包', img: '/images/weapen/背包.png' }]
        await ctx.render('page/weapenlauout', {
            title: '防具详情',
            cartgory: '防具',
            weapens: weapens
        })
    } catch (err) {
        console.log('防具详情出错', err)
    }
}

export const consumable = async ctx => {
    try {
        const weapens = [{ name: '消耗品', img: '/images/weapen/药品.png' }]
        await ctx.render('page/weapenlauout', {
            title: '消耗品详情',
            cartgory: '消耗品',
            weapens: weapens
        })
    } catch (err) {
        console.log('消耗品详情出错', err)
    }
}

export const parts = async ctx => {
    try {
        const weapens = [{ name: '弹夹', img: '/images/weapen/e1.png' },
        { name: '下部导轨', img: '/images/weapen/e3.png' },
        { name: '瞄准镜', img: '/images/weapen/e7.png' },
        { name: '枪口', img: '/images/weapen/e8.png' },
        { name: '狙击弹夹', img: '/images/weapen/e5.png' },]
        await ctx.render('page/weapenlauout', {
            title: '配件详情',
            cartgory: '配件',
            weapens: weapens
        })
    } catch (err) {
        console.log('配件详情出错', err)
    }
}

export const sniperrifle = async ctx => {
    try {
        const weapens = [{ name: '狙击枪', img: '/images/weapen/w7.png' }]
        await ctx.render('page/weapenlauout', {
            title: '狙击枪详情',
            cartgory: '狙击枪',
            weapens: weapens
        })
    } catch (err) {
        console.log('狙击枪详情出错', err)
    }
}

export const rifle = async ctx => {
    try {
        const weapens = [{ name: '突击步枪', img: '/images/weapen/w2.png' }]
        await ctx.render('page/weapenlauout', {
            title: '突击步枪详情',
            cartgory: '突击步枪',
            weapens: weapens
        })
    } catch (err) {
        console.log('突击步枪详情出错', err)
    }
}

export const shotgun = async ctx => {
    try {
        const weapens = [{ name: '霰弹枪', img: '/images/weapen/w1.png' }]
        await ctx.render('page/weapenlauout', {
            title: '霰弹枪详情',
            cartgory: '霰弹枪',
            weapens: weapens
        })
    } catch (err) {
        console.log('霰弹枪详情出错', err)
    }
}

export const submachinegun = async ctx => {
    try {
        const weapens = [{ name: '冲锋枪', img: '/images/weapen/w6.png' }]
        await ctx.render('page/weapenlauout', {
            title: '冲锋枪详情',
            cartgory: '冲锋枪',
            weapens: weapens
        })
    } catch (err) {
        console.log('冲锋枪详情出错', err)
    }
}

export const miscellaneous = async ctx => {
    try {
        const weapens = [{ name: '杂项武器', img: '/images/weapen/w8.png' }]
        await ctx.render('page/weapenlauout', {
            title: '杂项武器详情',
            cartgory: '杂项武器',
            weapens: weapens
        })
    } catch (err) {
        console.log('杂项武器详情出错', err)
    }
}

export const pistol = async ctx => {
    try {
        const weapens = [{ name: '手枪', img: '/images/weapen/w3.png' }]
        await ctx.render('page/weapenlauout', {
            title: '手枪详情',
            cartgory: '手枪',
            weapens: weapens
        })
    } catch (err) {
        console.log('手枪详情出错', err)
    }
}

export const closeweapon = async ctx => {
    try {
        const weapens = [{ name: '近战武器', img: '/images/weapen/w5.png' }]
        await ctx.render('page/weapenlauout', {
            title: '近战武器详情',
            cartgory: '近战武器',
            weapens: weapens
        })
    } catch (err) {
        console.log('近战武器详情出错', err)
    }
}
export const investment = async ctx => {
    try {
        const weapens = [{ name: '投掷武器', img: '/images/weapen/w4.png' }]
        await ctx.render('page/weapenlauout', {
            title: '投掷武器详情',
            cartgory: '投掷武器',
            weapens: weapens
        })
    } catch (err) {
        console.log('投掷武器详情出错', err)
    }
}