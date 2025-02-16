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
exports.CreateProfileDto = void 0;
const super_api_property_decorator_1 = require("../../../../libs/src/super-core/decorators/super-api-property.decorator");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateProfileDto {
}
exports.CreateProfileDto = CreateProfileDto;
__decorate([
    (0, super_api_property_decorator_1.SuperApiProperty)({
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "firstName", void 0);
__decorate([
    (0, super_api_property_decorator_1.SuperApiProperty)({
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "lastName", void 0);
__decorate([
    (0, super_api_property_decorator_1.SuperApiProperty)({
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "address", void 0);
__decorate([
    (0, super_api_property_decorator_1.SuperApiProperty)({
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "postalCode", void 0);
__decorate([
    (0, super_api_property_decorator_1.SuperApiProperty)({
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "aboutMe", void 0);
__decorate([
    (0, super_api_property_decorator_1.SuperApiProperty)({
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "phone", void 0);
__decorate([
    (0, super_api_property_decorator_1.SuperApiProperty)({
        type: Date,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateProfileDto.prototype, "birthday", void 0);
__decorate([
    (0, super_api_property_decorator_1.SuperApiProperty)({
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "country", void 0);
//# sourceMappingURL=create-profile.dto.js.map