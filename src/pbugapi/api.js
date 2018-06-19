import request from 'request-promise'
import api from '../config/pubg'

const pubgkey = api.apiKey

export default class pApi {
    constructor() {
        this.api_endpoint = "https://api.playbattlegrounds.com";
        this.api_key = pubgkey;
    }

    async request(options) {
        options = Object.assign({}, options, { json: true }, {
            headers: {
                "Accept": "application/vnd.api+json",
                "Authorization": `Bearer ${this.api_key}`
            }})

        try {
            const response = await request(options)
            return response
        } catch (error) {
            console.error(error)
        }
    }
    async getCurrentSeason(region) {
        const url = `${this.api_endpoint}/shards/pc-as/seasons`
        return this.request({ url: url })
    }

    async getPlayersInfo(nickname) {
        const url = `${this.api_endpoint}/shards/pc-as/players?filter[playerNames]=${nickname}`
        return this.request({ url: url })
    }

    async getPlayerbyId(id){
        const url = `${this.api_endpoint}/shards/pc-as/players/${id}`
        return this.request({ url: url })
    }

    async getPlayerStats(id){
        const url = `${this.api_endpoint}/shards/pc-as/players/${id}/seasons/division.bro.official.2018-06`
        return this.request({ url: url })
    }
}