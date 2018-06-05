import axios from 'axios'


export const name = async ctx => {
    
    const url = 'https://www.baidu.com'//'https://api.pubgtracker.com/v2/profile/pc/Express_Koa'

    function app (url){
        return new Promise((reslove, reject) => {
            axios.get(url
            //     , {
            //     headers: {
            //         'TRN-Api-Key': '0f42680c-adc4-4a56-867e-3fbab1c868e3'
            //     }
            // }
        ).then(res => {
                const zzca = '辣鸡psk'
                reslove(zzca)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    let zzc = await app(url)
    ctx.body = zzc
    console.log('1111')


    //ctx.body = 'zzc'
}