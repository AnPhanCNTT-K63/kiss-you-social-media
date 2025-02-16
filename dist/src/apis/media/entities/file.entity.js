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
exports.FileSchema = exports.File = void 0;
const super_prop_decorator_1 = require("../../../../libs/src/super-core/decorators/super-prop.decorator");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../../user/entities/user.entity");
const constants_1 = require("../../../constants");
const aggregate_root_schema_1 = require("../../../entities/aggregate-root.schema");
const autopopulate_soft_delete_1 = require("../../../utils/mongoose-plugins/autopopulate-soft-delete");
let File = class File extends aggregate_root_schema_1.AggregateRoot {
};
exports.File = File;
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: String,
        ref: constants_1.COLLECTION_NAMES.FILE,
    }),
    __metadata("design:type", String)
], File.prototype, "filePath", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: String,
    }),
    __metadata("design:type", String)
], File.prototype, "name", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: String,
    }),
    __metadata("design:type", String)
], File.prototype, "filename", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({ type: String }),
    __metadata("design:type", String)
], File.prototype, "folder", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({ type: String }),
    __metadata("design:type", String)
], File.prototype, "note", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({ type: String }),
    __metadata("design:type", String)
], File.prototype, "mime", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({ type: Number }),
    __metadata("design:type", Number)
], File.prototype, "size", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({ type: String }),
    __metadata("design:type", String)
], File.prototype, "alt", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: mongoose_2.Types.ObjectId,
        ref: 'User',
        refClass: user_entity_1.User,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], File.prototype, "createdBy", void 0);
exports.File = File = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: constants_1.COLLECTION_NAMES.FILE,
    })
], File);
exports.FileSchema = mongoose_1.SchemaFactory.createForClass(File);
exports.FileSchema.plugin(autopopulate_soft_delete_1.default);
//# sourceMappingURL=file.entity.js.map