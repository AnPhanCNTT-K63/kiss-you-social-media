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
exports.UserSchema = exports.User = void 0;
const super_prop_decorator_1 = require("../../../../libs/src/super-core/decorators/super-prop.decorator");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../../constants");
const aggregate_root_schema_1 = require("../../../entities/aggregate-root.schema");
const profile_entity_1 = require("../../profile/entities/profile.entity");
const autopopulate_soft_delete_1 = require("../../../utils/mongoose-plugins/autopopulate-soft-delete");
let User = class User extends aggregate_root_schema_1.AggregateRoot {
};
exports.User = User;
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        autoPopulateExclude: true,
        type: String,
        required: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: String,
        required: true,
        default: 'user',
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isOnline", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isBanned", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isDeleted", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: Date,
        required: false,
    }),
    __metadata("design:type", Date)
], User.prototype, "lastOnline", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: [mongoose_2.Types.ObjectId],
        required: false,
        ref: 'User',
        refClass: User,
    }),
    __metadata("design:type", Array)
], User.prototype, "friends", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: mongoose_2.Types.ObjectId,
        required: false,
        ref: 'Profile',
        refClass: profile_entity_1.Profile,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], User.prototype, "profile", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: constants_1.COLLECTION_NAMES.USER,
    })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.plugin(autopopulate_soft_delete_1.default);
//# sourceMappingURL=user.entity.js.map