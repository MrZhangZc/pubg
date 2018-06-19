import pubgApi from './api'

async function zzca (){
    let zzc = new pubgApi()

    let hm = await zzc.getPlayersInfo('moluJL')
    console.log(hm.data[0])
}

zzca()

