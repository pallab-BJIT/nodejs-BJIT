const success = (message, data) => {
    return {
        success: true,
        message,
        data,
    };
};
const failure = (message, error = null) => {
    return {
        success: false,
        message,
        error,
    };
};

module.exports = {
    success,
    failure,
};
