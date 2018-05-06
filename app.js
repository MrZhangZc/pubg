
const axios = require('axios')

const url = 'https://api.pubgtracker.com/v2/profile/pc/Express_Koa'

function app(url){
	return axios.get(url,{
		headers: {
			'TRN-Api-Key' : '0f42680c-adc4-4a56-867e-3fbab1c868e3'
		}
	}).then( response => {
		console.log(response)
		}).catch( err => {
			console.log(err)
	})
}

app(url)
