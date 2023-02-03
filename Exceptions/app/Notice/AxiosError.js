exports.AxiosError = class AxiosRequestError extends Error {
    code = 500;

    constructor() {
        super('Axios error while request');
    }
};
