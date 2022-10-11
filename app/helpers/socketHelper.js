const ccxt = require('ccxt')
const HttpsProxyAgent = require('https-proxy-agent')
const helper= require('../helpers/helper')

exports.tickers = async () => {
    const proxy = process.env.HTTP_PROXY || 'http://168.63.76.32:3128' // HTTP/HTTPS proxy to connect to
    const agent = new HttpsProxyAgent(proxy)

    let exchange = new ccxt.binance({
        userAgent: agent,
        enableRateLimit: true,
        timeout: 30000
    }) // 30000 in milliseconds = 30 seconds

    const btc = await exchange.fetchTicker('BTC/USDT')
    await helper.sleep(1000)
    const eth = await exchange.fetchTicker('ETH/USDT')
    await helper.sleep(1000)
    const ada = await exchange.fetchTicker('ADA/USDT')
    await helper.sleep(1000)
    const wax = await exchange.fetchTicker('WAXP/USDT')
    const data={
        btc:btc,
        eth:eth,
        ada:ada,
        wax:wax,
    }
    //console.log(data)

    return data
}