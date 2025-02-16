"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsExistConstraint = void 0;
exports.IsExist = IsExist;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
let IsExistConstraint = class IsExistConstraint {
    constructor(connection) {
        this.connection = connection;
    }
    async validate(value, args) {
        if (!value)
            return false;
        const [options] = args.constraints;
        const { collectionName, isArray = false } = options;
        try {
            const collection = this.connection.collection(collectionName);
            const query = isArray ? { _id: { $in: value } } : { _id: value };
            const result = await collection.countDocuments(query);
            return isArray ? result === value.length : result > 0;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    defaultMessage(args) {
        return `${args.property} does not exist`;
    }
};
exports.IsExistConstraint = IsExistConstraint;
exports.IsExistConstraint = IsExistConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection])
], IsExistConstraint);
function IsExist(options) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: options,
            constraints: [options],
            validator: IsExistConstraint,
        });
    };
}
//# sourceMappingURL=is-exist-constraint.service.js.map