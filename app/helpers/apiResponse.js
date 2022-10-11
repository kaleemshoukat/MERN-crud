/**
 * Helper - Error function for api response
 * @param {*} message
 * @param {*} data
 * @returns {status & message & data}
 */
exports.error= (message='Something went wrong.', data=null) => {
    return {
        status: false,
        message : message,
        data : data,
    }
}

/**
 * Helper - Success function for api response
 * @param {*} message
 * @param {*} data
 * @returns {status & message & data}
 */
exports.success= (message='Operation succeeded!', data=null) => {
    return {
        status: true,
        message : message,
        data : data,
    }
}

/**
 * Helper - Validationn function for api response
 * @param {*} message
 * @param {*} data
 * @returns {status & message & data}
 */
exports.validation= (data, message='Please resolve the following errors!') => {
    return {
        status: false,
        message : message,
        data : data,
    }
}
