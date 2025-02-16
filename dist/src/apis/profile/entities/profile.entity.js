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
exports.ProfileSchema = exports.Profile = void 0;
const super_prop_decorator_1 = require("../../../../libs/src/super-core/decorators/super-prop.decorator");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../../constants");
const user_entity_1 = require("../../user/entities/user.entity");
const autopopulate_soft_delete_1 = require("../../../utils/mongoose-plugins/autopopulate-soft-delete");
let Profile = class Profile {
};
exports.Profile = Profile;
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: String,
        required: false,
    }),
    __metadata("design:type", String)
], Profile.prototype, "firstName", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: String,
        required: false,
    }),
    __metadata("design:type", String)
], Profile.prototype, "lastName", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: String,
        required: false,
    }),
    __metadata("design:type", String)
], Profile.prototype, "address", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: String,
        required: false,
    }),
    __metadata("design:type", String)
], Profile.prototype, "postalCode", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: String,
        required: false,
    }),
    __metadata("design:type", String)
], Profile.prototype, "aboutMe", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: String,
        required: false,
    }),
    __metadata("design:type", String)
], Profile.prototype, "phone", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: Date,
        required: false,
    }),
    __metadata("design:type", Date)
], Profile.prototype, "birthday", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: String,
        required: false,
    }),
    __metadata("design:type", String)
], Profile.prototype, "country", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: mongoose_2.Types.ObjectId,
        required: false,
        ref: 'File',
        refClass: File,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Profile.prototype, "coverPhoto", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: mongoose_2.Types.ObjectId,
        required: false,
        ref: 'File',
        refClass: File,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Profile.prototype, "avatar", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: mongoose_2.Types.ObjectId,
        required: true,
        ref: 'User',
        refClass: user_entity_1.User,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Profile.prototype, "user", void 0);
exports.Profile = Profile = __decorate([
    (0, mongoose_1.Schema)({
        collection: constants_1.COLLECTION_NAMES.PROFILE,
    })
], Profile);
exports.ProfileSchema = mongoose_1.SchemaFactory.createForClass(Profile);
exports.ProfileSchema.plugin(autopopulate_soft_delete_1.default);
//# sourceMappingURL=profile.entity.js.map