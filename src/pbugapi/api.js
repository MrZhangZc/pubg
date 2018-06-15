import request from 'request-promise'
import api from '../config/pubg'

const pubgkey = api.apiKey

export default class pubgApi {
    constructor() {
        this.api_endpoint = "https://api.playbattlegrounds.com";
        this.api_key = pubgkey;
    }

    api_call(url) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.setRequestHeader("Accept", "application/vnd.api+json");
            if (this.api_key) request.setRequestHeader("Authorization", `Bearer ${this.api_key}`);
            request.onload = () => resolve(JSON.parse(request.response));
            request.send();
        });
    }

    async getPlayersInfo(nicknames) {
        return this.api_call(`${this.api_endpoint}/shards/pc-as/players/${nicknames}`).then(res => res);
    }
}