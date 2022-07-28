/**
 * Helper - Generate randon string with given length function
 * @param {*} length
 * @returns randomString
 */
exports.randomStr = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Helper - Generate randon digits with given length function
 * @param {*} n
 * @returns rendonDigits
 */
exports.randomDigits = (n) => {
    n=n-1
    return Math.floor(Math.random() * (9 * (Math.pow(10, n)))) + (Math.pow(10, n));
}

/**
 * Helper - Generate unique string function
 * @returns uniqueString
 */
exports.uniqueStr = () => {
    return (new Date()).getTime().toString(8) + Math.random().toString(8).slice(2)
}

/**
 * Helper - Change format of date function
 * @param {*} date
 * @returns date
 */
exports.date_format= (date) => {
    const array = date.split("-")
    return  array[0] + "-" + array[1] + "-" + array[2]
}

/**
 * Helper - Change format of date function
 * @param {*} date
 * @returns date
 */
exports.dateFormatSlah= (date) => {
    const array = date.split("/")
    return  array[2] + "-" + array[1] + "-" + array[0]
}

/**
 * Helper - Generate base url of app function
 * @returns baseURl
 */
exports.base_url= () => {
    const host = process.env.API_URL
    const port = process.env.API_PORT

    return `${host}:${port}`
}

exports.sleep= (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}