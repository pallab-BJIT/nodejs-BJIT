const success = (message, data = null) => {
    return JSON.stringify({
        success: true,
        message,
        data: data,
    });
};
const failure = (message, error = null) => {
    return JSON.stringify({
        success: false,
        message,
        error,
    });
};

module.exports = {
    success,
    failure,
};
