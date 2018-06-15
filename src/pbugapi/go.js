import pubgApi from './api'

async function zzca (){
    let zzc = new pubgApi()

    let hm = await zzc.getPlayersInfo('Express_Koa')
    console.log(hm)
}

zzca()


