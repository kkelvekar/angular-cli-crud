"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumberValidator = (function () {
    function NumberValidator() {
    }
    NumberValidator.range = function (min, max) {
        return function (c) {
            if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { 'range': true };
            }
            return null;
        };
    };
    return NumberValidator;
}());
exports.NumberValidator = NumberValidator;
//# sourceMappingURL=number-validator.js.map