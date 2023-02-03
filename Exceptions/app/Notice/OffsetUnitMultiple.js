exports.OffsetUnitMultiple = class OffsetUnitMultiple extends Error {
    code = 400;

    constructor(unit) {
        super(`Offset should be multiple of ${unit}`);
    }
};
