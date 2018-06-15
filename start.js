require('babel-core/register')({
    'presets': [
        'env'
    ]
})

require('babel-polyfill')
//require('./src/pbugapi/go')
require('./src/app')