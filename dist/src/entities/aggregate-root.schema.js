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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const super_prop_decorator_1 = require("../../libs/src/super-core/decorators/super-prop.decorator");
const constants_1 = require("../constants");
let AggregateRoot = class AggregateRoot extends mongoose_2.Document {
};
exports.AggregateRoot = AggregateRoot;
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: mongoose_2.Types.ObjectId,
        ref: constants_1.COLLECTION_NAMES.USER,
        cms: {
            label: 'Updated By',
        },
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AggregateRoot.prototype, "updatedBy", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: mongoose_2.Types.ObjectId,
        ref: constants_1.COLLECTION_NAMES.USER,
        cms: {
            label: 'Deleted By',
        },
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AggregateRoot.prototype, "deletedBy", void 0);
exports.AggregateRoot = AggregateRoot = __decorate([
    (0, mongoose_1.Schema)()
], AggregateRoot);
//# sourceMappingURL=aggregate-root.schema.js.map