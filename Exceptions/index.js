exports.KeynotExist = class KeynotExist extends Error {
    constructor(value) {
        super(`Key not found : ${value}`);
    }
};

exports.AxiosError = class AxiosRequestError extends Error {
    constructor() {
        super('Axios error while request');
    }
};

exports.InstanceNotInitiated = class InstanceNotInitiated extends Error {
    constructor() {
        super('Instance not initaited. Please call init() for instance initation');
    }
};

exports.OffsetUnitMultiple = class OffsetUnitMultiple extends Error {
    constructor(unit) {
        super(`Offset should be multiple of ${unit}`)
    }
};
