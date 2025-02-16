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
exports.SoftDeleteDto = void 0;
const super_api_property_decorator_1 = require("../../../../libs/src/super-core/decorators/super-api-property.decorator");
const class_validator_1 = require("class-validator");
class SoftDeleteDto {
}
exports.SoftDeleteDto = SoftDeleteDto;
__decorate([
    (0, super_api_property_decorator_1.SuperApiProperty)({
        type: Number,
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SoftDeleteDto.prototype, "flag", void 0);
//# sourceMappingURL=delete-soft.dto.js.map